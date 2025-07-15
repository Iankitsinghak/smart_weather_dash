import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

# Optional: preload model for efficiency
model = genai.GenerativeModel("gemini-pro")

def get_professional_response(message: str, city: str, profession: str = "general") -> str:
    """
    Uses Gemini to return profession-specific advice based on city weather.
    """
    prompt = f"""
    You are an AI assistant specialized in weather guidance. The user is a {profession}.
    They are in {city} and want advice or information regarding the weather.

    Question: "{message}"

    Respond with clear, helpful, and personalized guidance.
    If their profession is:
    - Doctor: give advice about flu risk, heat precautions, hydration, etc.
    - Farmer: talk about rain forecasts, crop suggestions, etc.
    - Traveler: suggest clothing, local conditions, or flight/weather warnings.
    - Student: talk about school weather closures or daily essentials.
    - Developer: be creative — maybe comment on how weather affects productivity 🌦️

    Keep it short, friendly, and helpful.
    """

    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        return "I'm having trouble generating a response right now. Please try again later."
