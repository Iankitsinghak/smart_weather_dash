import React, { useState } from 'react';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import ChatAssistant from './components/ChatAssistant';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';

export default function App() {
  const [city, setCity] = useState('');
  const [profession, setProfession] = useState('general');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      const res = await axios.post('https://your-render-backend.onrender.com/weather', {
        city,
        profession
      });
      setWeather(res.data);
    } catch (err) {
      alert("Failed to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-center">🌦️ Weather Dashboard</h1>

        <div className="flex flex-col sm:flex-row gap-4">
          <Input placeholder="Enter city" value={city} onChange={e => setCity(e.target.value)} className="flex-1" />
          <Input placeholder="Profession (e.g. farmer, pilot)" value={profession} onChange={e => setProfession(e.target.value)} className="flex-1" />
          <Button onClick={fetchWeather} disabled={loading}>
            {loading ? "Loading..." : "Get Weather"}
          </Button>
        </div>

        {weather && <WeatherCard data={weather} />}

        {weather && <ChatAssistant city={city} profession={profession} />}
      </div>
    </div>
  );
}
