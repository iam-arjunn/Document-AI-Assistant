from pathlib import Path
import io
import re
import shutil
import fitz
from docx import Document
from fastapi import HTTPException, UploadFile

from constants import FILE_CONSTANTS, MAX_FILE_SIZE
from models.file import (
    DocumentUploadResult,
    FileErrorMessage,
    DocumentStatus
)


async def get_file_size(file: UploadFile) -> str:
    content = await file.read()
    size_bytes = len(content)
    await file.seek(0)

    if size_bytes < 1024:
        return f"{size_bytes} B"
    elif size_bytes < 1024**2:
        return f"{size_bytes / 1024:.2f} KB"
    elif size_bytes < 1024**3:
        return f"{size_bytes / (1024**2):.2f} MB"
    elif size_bytes < 1024**4:
        return f"{size_bytes / (1024**3):.2f} GB"

    return f"{size_bytes / (1024**4):.2f} TB"


async def extract_content(file: UploadFile) -> str:
    extension = Path(file.filename).suffix.lower()

    if extension == ".txt":
        return await extract_from_txt(file)

    if extension == ".docx":
        return await extract_from_docx(file)

    if extension == ".pdf":
        return await extract_from_pdf(file)

    raise HTTPException(
        status_code=400,
        detail="Only PDF, DOCX and TXT files are supported.",
    )


async def extract_from_txt(file: UploadFile) -> str:
    content = await file.read()
    await file.seek(0)
    return content.decode("utf-8")


async def extract_from_docx(file: UploadFile) -> str:
    content = await file.read()

    document = Document(io.BytesIO(content))

    await file.seek(0)

    return "\n".join(paragraph.text for paragraph in document.paragraphs)


async def extract_from_pdf(file: UploadFile) -> str:
    content = await file.read()

    pdf = fitz.open(stream=content, filetype="pdf")

    text = ""

    for page in pdf:
        text += page.get_text()

    pdf.close()

    await file.seek(0)

    return text


def get_next_filename(extension: str) -> str:
    if extension not in FILE_CONSTANTS:
        raise ValueError(f"Unsupported extension: {extension}")

    config = FILE_CONSTANTS[extension]

    upload_dir = Path("uploads") / FILE_CONSTANTS[extension]["folder"]
    upload_dir.mkdir(parents=True, exist_ok=True)

    used_numbers = []

    for file in upload_dir.iterdir():
        match = re.match(config["regex"], file.stem)

        if match:
            used_numbers.append(int(match.group(1)))

    number = 1

    while number in used_numbers:
        number += 1

    return f"{config['pattern']}{number:02d}{extension}"


async def validate_uploaded_file(
    file: UploadFile,
) -> DocumentUploadResult:

    extension = Path(file.filename).suffix.lower()

    content = await file.read()
    await file.seek(0)

    size_bytes = len(content)

    if size_bytes == 0:
        return DocumentUploadResult(
            original_filename=file.filename,
            status="Failed",
            error=FileErrorMessage(
                code="EMPTY_FILE",
                message="The uploaded file is empty.",
            ),
        )

    if size_bytes > MAX_FILE_SIZE:
        return DocumentUploadResult(
            original_filename=file.filename,
            status="Failed",
            error=FileErrorMessage(
                code="FILE_TOO_LARGE",
                message="The uploaded file exceeds the maximum allowed size of 25 MB.",
            ),
        )

    if extension not in FILE_CONSTANTS:
        return DocumentUploadResult(
            original_filename=file.filename,
            status="Failed",
            error=FileErrorMessage(
                code="UNSUPPORTED_FILE_TYPE",
                message="Only PDF, DOCX and TXT files are supported.",
            ),
        )

    return DocumentUploadResult(
        original_filename=file.filename,
        status="Valid",
    )


async def save_uploaded_file(file: UploadFile) -> DocumentUploadResult:
    extension = Path(file.filename).suffix.lower()

    new_filename = get_next_filename(extension)

    upload_directory = Path("uploads") / FILE_CONSTANTS[extension]["folder"]
    upload_directory.mkdir(parents=True, exist_ok=True)

    file_path = upload_directory / new_filename

    file_size = await get_file_size(file)   # Read size first

    with file_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    await file.close()

    return DocumentUploadResult(
        document_id=new_filename,
        original_filename=file.filename,
        file_size=file_size,
        status=DocumentStatus.UPLOADED,
    )