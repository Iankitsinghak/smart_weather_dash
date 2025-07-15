import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [city, setCity] = useState("");
  const [profession, setProfession] = useState("general");
  const [weather, setWeather] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const BACKEND_URL = "https://smart-weather-dash.onrender.com";

  const fetchWeather = async () => {
    if (!city) return alert("Please enter a city");
    setLoading(true);
    try {
      const res = await axios.post(`${BACKEND_URL}/weather`, { city, profession });
      setWeather(res.data);
    } catch (err) {
      alert("Failed to fetch weather. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!chatInput.trim()) return;
    try {
      const res = await axios.post(`${BACKEND_URL}/chat`, {
        city,
        profession,
        message: chatInput,
      });
      setChatResponse(res.data.response);
    } catch (err) {
      alert("Assistant failed to respond.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-center">🌤️ Weather AI Dashboard</h1>

        <div className="bg-gray-800 p-4 rounded-xl shadow-xl space-y-4">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            className="w-full p-3 rounded-lg bg-gray-700 text-white"
          />

          <select
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 text-white"
          >
            <option value="general">General</option>
            <option value="farmer">Farmer</option>
            <option value="pilot">Pilot</option>
            <option value="event_planner">Event Planner</option>
            <option value="teacher">Teacher</option>
          </select>

          <button
            onClick={fetchWeather}
            className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-bold"
          >
            {loading ? "Loading..." : "Get Weather"}
          </button>
        </div>

        {weather && (
          <div className="bg-gray-800 p-4 rounded-xl shadow-xl">
            <h2 className="text-xl font-bold mb-2">Weather in {weather.city}, {weather.country}</h2>
            <div className="grid grid-cols-2 gap-3">
              <p>🌡️ Temp: {weather.current_temp}°C</p>
              <p>Feels like: {weather.feels_like}°C</p>
              <p>Humidity: {weather.humidity}%</p>
              <p>Pressure: {weather.pressure} hPa</p>
              <p>Wind: {weather.wind_Gust_Speed} m/s</p>
              <p>Condition: {weather.description}</p>
            </div>
          </div>
        )}

        <div className="bg-gray-800 p-4 rounded-xl shadow-xl space-y-4">
          <textarea
            rows="3"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Ask your assistant..."
            className="w-full p-3 rounded-lg bg-gray-700 text-white"
          ></textarea>

          <button
            onClick={sendMessage}
            className="w-full bg-green-600 hover:bg-green-700 p-3 rounded-lg font-bold"
          >
            Ask AI
          </button>

          {chatResponse && (
            <div className="bg-gray-700 p-3 rounded-lg">
              <strong>Assistant:</strong>
              <p>{chatResponse}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
