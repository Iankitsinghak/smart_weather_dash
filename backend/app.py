### app.py
from fastapi import FastAPI, Request, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from dotenv import load_dotenv
import google.generativeai as genai
import os
from chat import get_professional_response
from weather import fetch_weather_data

load_dotenv()

app = FastAPI()

# CORS for frontend on Vercel
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage
scheduler = AsyncIOScheduler()
scheduler.start()

class CityRequest(BaseModel):
    city: str
    profession: str = "general"

class ChatRequest(BaseModel):
    city: str
    profession: str
    message: str

@app.post("/weather")
async def get_weather(request: CityRequest):
    try:
        data = fetch_weather_data(request.city)
        return JSONResponse(content={"success": True, **data})
    except Exception as e:
        return JSONResponse(status_code=500, content={"success": False, "error": str(e)})

@app.post("/chat")
async def chat_with_ai(request: ChatRequest):
    try:
        reply = get_professional_response(request.message, request.city, request.profession)
        return JSONResponse(content={"success": True, "response": reply})
    except Exception as e:
        return JSONResponse(status_code=500, content={"success": False, "error": str(e)})
