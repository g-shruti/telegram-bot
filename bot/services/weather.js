const axios = require('axios');

const getWeather = async (city, apiKey) => {
  try {
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const temp = res.data.main.temp;
    const desc = res.data.weather[0].description;
    return `🌤️ Weather in ${city}: ${temp}°C, ${desc}`;
  } catch (err) {
    return `⚠️ Unable to fetch weather for ${city}`;
  }
};

module.exports = getWeather;
