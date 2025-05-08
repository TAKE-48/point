from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from .api import router

app = FastAPI(title="スナックリワードアプリ", description="お菓子の消費財メーカー向けのリワードアプリ")

# Disable CORS. Do not remove this for full-stack development.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

app.include_router(router, prefix="/api")

@app.get("/healthz")
async def healthz():
    return {"status": "ok"}

@app.get("/")
async def root():
    return {
        "app": "スナックリワードアプリ",
        "version": "1.0.0",
        "timestamp": datetime.now().isoformat()
    }
