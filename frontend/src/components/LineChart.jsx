import React from 'react';
import { LineChart as LChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LineChart = ({ data }) => {
  const chartData = [
    {
      name: data.city,
      Humidity: data.humidity,
      Pressure: data.pressure,
    }
  ];

  return (
    <div className="bg-gray-800 p-4 rounded mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <LChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Humidity" stroke="#8884d8" />
          <Line type="monotone" dataKey="Pressure" stroke="#82ca9d" />
        </LChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;
