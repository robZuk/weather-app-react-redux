import axios from "axios";
import env from "react-dotenv";

const getCurrentWeatherData = async (location) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${location?.lat}&lon=${location?.lon}&appid=${env.API_KEY}`
  );
  return response.data;
};

const getCurrentWeatherService = {
  getCurrentWeatherData,
};

export default getCurrentWeatherService;
