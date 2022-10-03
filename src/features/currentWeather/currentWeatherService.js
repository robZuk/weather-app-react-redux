import axios from "axios";

const getCurrentWeatherData = async (location) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${location?.lat}&lon=${location?.lon}&appid=${process.env.REACT_APP_API_KEY}`
  );
  return response.data;
};

const getCurrentWeatherService = {
  getCurrentWeatherData,
};

export default getCurrentWeatherService;
