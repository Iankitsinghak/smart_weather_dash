// App.jsx
import React, { useState } from 'react';
import WeatherCard from './components/WeatherCard';
import ChatAssistant from './components/ChatAssistant';
import { Input } from './components/ui/Input';
import { Button } from './components/ui/Button';

const App = () => {
  const [city, setCity] = useState('');
  const [profession, setProfession] = useState('general');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://your-render-backend.onrender.com/weather', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city, profession }),
      });

      const result = await res.json();
      if (result.success) {
        setWeatherData(result);
      } else {
        setError(result.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Failed to fetch weather');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white p-6 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-center">Weather Dashboard</h1>

        <div className="grid md:grid-cols-3 gap-4 items-center">
          <Input placeholder="Enter city..." value={city} onChange={(e) => setCity(e.target.value)} />
          <select
            className="bg-gray-800 p-2 rounded-md text-white border border-gray-700"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
          >
            <option value="general">General</option>
            <option value="farmer">Farmer</option>
            <option value="event Planner">Event Planner</option>
            <option value="construction">Construction Worker</option>
            <option value="energy Planner">Energy Grid Planner</option>
            <option value="delivery">Delivery Driver</option>
          </select>
          <Button onClick={handleFetchWeather} disabled={loading}>
            {loading ? 'Loading...' : 'Get Weather'}
          </Button>
        </div>

        {error && <div className="text-red-400">{error}</div>}
        {weatherData && <WeatherCard data={weatherData} />}
        {weatherData && <ChatAssistant city={city} profession={profession} />}
      </div>
    </div>
  );
};

export default App;
