import React, { useEffect, useState } from 'react';
import WeatherCard from './components/WeatherCard';
import LineChart from './components/LineChart';
import Chatbot from './components/Chatbot';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Kolkata');
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city.trim()) return;

    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/weather?city=${city}`);
      const data = await res.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Weather fetch error:', error);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="text-center text-4xl font-extrabold mb-6 tracking-wide">
        ClimaBotX <span role="img" aria-label="weather">🌤️</span>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
        <input
          className="w-full sm:w-64 p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-medium transition"
          onClick={fetchWeather}
        >
          {loading ? 'Loading...' : 'Search'}
        </button>
      </div>

      {weatherData ? (
        <div className="flex flex-col gap-6">
          <WeatherCard data={weatherData} />
          <LineChart data={weatherData} />
        </div>
      ) : (
        <p className="text-center text-gray-400 mt-6">Enter a valid city to view weather info 🌍</p>
      )}

      {/* Floating Chatbot */}
      <Chatbot city={city} />
    </div>
  );
};

export default App;
