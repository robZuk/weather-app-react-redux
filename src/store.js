import { configureStore } from "@reduxjs/toolkit";
import currentWeatherReducer from "./features/currentWeather/currentWeatherSlice";
import forecastWeatherReducer from "./features/forecastWeather/forecastWeatherSlice";
import searchedCitiesReducer from "./features/searchedCities/searchedCitesSlice";

export const store = configureStore({
  reducer: {
    currentWeather: currentWeatherReducer,
    forecastWeather: forecastWeatherReducer,
    searchedCities: searchedCitiesReducer,
  },
});
