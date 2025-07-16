import axios from 'axios';

export const getWeather = async (req, res) => {
  const { city } = req.query;
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
    const { data } = await axios.get(url);
    res.json({
      city: data.name,
      temp: data.main.temp,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      condition: data.weather[0].main,
    });
  } catch (err) {
    res.status(500).json({ error: 'Weather fetch failed' });
  }
};
