import React, { useState } from 'react';
import WeatherCard from './components/WeatherCard';
import ChatAssistant from './components/ChatAssistant';
import axios from 'axios';

const App = () => {
  const [city, setCity] = useState('');
  const [profession, setProfession] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('https://your-backend-url.onrender.com/weather', {
        city,
        profession
      });
      setWeatherData(response.data);
    } catch (err) {
      setError('Failed to fetch weather data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">🌤️ Weather Forecast Dashboard</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 p-3 bg-gray-800 rounded-xl outline-none"
          />
          <select
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            className="flex-1 p-3 bg-gray-800 rounded-xl outline-none"
          >
            <option value="">Select profession</option>
            <option value="farmer">Farmer</option>
            <option value="energy Planner">Energy Grid Planner</option>
            <option value="event Planner">Event Planner</option>
            <option value="construction">Construction Worker</option>
            <option value="delivery">Delivery Driver</option>
            <option value="others">Others</option>
          </select>
          <button
            onClick={fetchWeather}
            className="bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-xl"
          >
            Get Weather
          </button>
        </div>

        {loading && <div className="text-center text-pink-400">Loading...</div>}
        {error && <div className="text-red-500 text-center">{error}</div>}

        {weatherData && weatherData.success && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <WeatherCard data={weatherData} />
            </div>
            <div className="lg:col-span-1">
              <ChatAssistant city={city} profession={profession} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
