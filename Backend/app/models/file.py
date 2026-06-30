from typing import Optional
from pydantic import BaseModel
from enum import Enum

class DocumentStatus(str, Enum):
    VALID = "Valid"
    UPLOADED = "Uploaded"
    FAILED = "Failed"

class FileErrorMessage(BaseModel):
    code: str
    message: str


class DocumentUploadResult(BaseModel):
    document_id: Optional[str] = None
    original_filename: str
    file_size: Optional[str] = None
    status: DocumentStatus
    error: Optional[FileErrorMessage] = None


class SaveFilesResult(BaseModel):
    uploaded_files: list[DocumentUploadResult]
    failed_files: list[DocumentUploadResult]


class UploadDocumentsResponse(BaseModel):
    status: str
    message: str
    count: int
    files: list[DocumentUploadResult]