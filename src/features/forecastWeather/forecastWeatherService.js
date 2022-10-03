import axios from "axios";

const getForecastWeatherData = async (location) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=${process.env.REACT_APP_API_KEY}`
  );
  return response.data;
};

const getForecastWeatherService = {
  getForecastWeatherData,
};

export default getForecastWeatherService;
