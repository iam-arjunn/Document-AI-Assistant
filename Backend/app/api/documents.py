from fastapi import APIRouter, File, UploadFile

from models.file import UploadDocumentsResponse
from services.file_service import save_files

router = APIRouter(
    prefix="/documents",
    tags=["Document"],
)


@router.post(
    "/upload",
    response_model=UploadDocumentsResponse,
)
async def upload_files(
    files: list[UploadFile] = File(...)
):
    result = await save_files(files)

    uploaded_count = len(result.uploaded_files)
    failed_count = len(result.failed_files)
    total_count = uploaded_count + failed_count

    all_files = result.uploaded_files + result.failed_files

    if uploaded_count == total_count:
        return UploadDocumentsResponse(
            status="Success",
            message=f"{uploaded_count} file(s) uploaded successfully.",
            count=total_count,
            files=all_files,
        )

    if uploaded_count > 0:
        return UploadDocumentsResponse(
            status="Partial Success",
            message=f"{uploaded_count} of {total_count} file(s) uploaded successfully.",
            count=total_count,
            files=all_files,
        )

    return UploadDocumentsResponse(
        status="Failed",
        message="No files were uploaded.",
        count=total_count,
        files=all_files,
    )