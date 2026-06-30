from fastapi import UploadFile

from models.file import SaveFilesResult
from utils.file_utils import (
    save_uploaded_file,
    validate_uploaded_file,
)


async def save_files(files: list[UploadFile]) -> SaveFilesResult:
    uploaded_files = []
    failed_files = []

    for file in files:
        validation = await validate_uploaded_file(file)

        if validation.status == "Failed":
            failed_files.append(validation)
            continue

        saved_file = await save_uploaded_file(file)
        uploaded_files.append(saved_file)

    return SaveFilesResult(
        uploaded_files=uploaded_files,
        failed_files=failed_files,
    )