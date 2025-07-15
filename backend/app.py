# backend/app.py
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from weather import get_current_weather, get_hourly_forecast
from chat import get_profession_advice
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Allow frontend origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CityRequest(BaseModel):
    city: str

class ChatRequest(BaseModel):
    city: str
    message: str

@app.post("/weather")
async def fetch_weather(request: CityRequest):
    try:
        current = get_current_weather(request.city)
        forecast = get_hourly_forecast(request.city)
        return JSONResponse(content={**current, **forecast})
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

@app.post("/chat")
async def chat_ai(req: ChatRequest):
    try:
        advice = get_profession_advice(req.city, req.message)
        return {"response": advice}
    except Exception as e:
        return {"response": f"Error: {str(e)}"}
