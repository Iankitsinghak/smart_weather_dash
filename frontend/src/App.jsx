import React, { useEffect, useState } from 'react';
import WeatherCard from './components/WeatherCard';
import LineChart from './components/LineChart';
import Chatbot from './components/Chatbot';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Kolkata');

  const fetchWeather = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/weather?city=${city}`);
    const data = await res.json();
    setWeatherData(data);
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="text-center text-4xl font-bold mb-6">ClimaBotX 🌤️</div>
      <input
        className="p-2 mb-4 rounded bg-gray-800 text-white"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button
        className="ml-2 px-4 py-2 bg-blue-600 rounded"
        onClick={fetchWeather}
      >
        Search
      </button>

      {weatherData && (
        <>
          <WeatherCard data={weatherData} />
          <LineChart data={weatherData} />
        </>
      )}

      <Chatbot city={city} />
    </div>
  );
};

export default App;
