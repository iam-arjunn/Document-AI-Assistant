from fastapi import APIRouter
from api.documents import router as Documents

router = APIRouter()
router.include_router(Documents)

