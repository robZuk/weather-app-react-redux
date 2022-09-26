import axios from "axios";
import env from "react-dotenv";

const getSearchedCities = async (value) => {
  const response = await axios.get(
    `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=${5}&appid=${
      env.API_KEY
    }`
  );
  return response.data;
};

const searchedCitiesService = {
  getSearchedCities,
};

export default searchedCitiesService;
