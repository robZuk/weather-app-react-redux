import axios from "axios";
import env from "react-dotenv";

const getForecastWeatherData = async (location) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=${env.API_KEY}`
  );
  return response.data;
};

const getForecastWeatherService = {
  getForecastWeatherData,
};

export default getForecastWeatherService;
