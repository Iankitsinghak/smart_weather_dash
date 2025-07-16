import React from 'react';

const WeatherCard = ({ data }) => (
  <div className="bg-gray-800 p-4 rounded mt-4">
    <h2 className="text-xl font-semibold mb-2">{data.city}</h2>
    <p>Temperature: {data.temp}°C</p>
    <p>Humidity: {data.humidity}%</p>
    <p>Pressure: {data.pressure} hPa</p>
    <p>Condition: {data.condition}</p>
  </div>
);

export default WeatherCard;
