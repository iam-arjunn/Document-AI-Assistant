from fastapi import FastAPI
from settings import settings
from fastapi.middleware.cors import CORSMiddleware
from constants import SUPPORTED_FILE_TYPES, PROJECT_FEATURES
from api.router import router as Routers

app=FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(Routers)

@app.get("/", tags=["Project Details"])
async def get_information():
    return {
        "Name": settings.PROJECT_NAME,
        "Description": settings.PROJECT_DESCRIPTION,
        "Version": settings.PROJECT_VERSION, 
        "Feature": PROJECT_FEATURES,
        "Support File Types": SUPPORTED_FILE_TYPES
    }