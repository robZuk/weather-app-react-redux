import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import forecastWeatherService from "./forecastWeatherService";

const initialState = {
  forecastWeatherData: {},
  error: false,
  loading: false,
};

//Get forecast weather data
export const getForecastWeather = createAsyncThunk(
  "forecastWeather/getAll",
  async (location, thunkAPI) => {
    try {
      return await forecastWeatherService.getForecastWeatherData(location);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const forecastWeatherDataSlice = createSlice({
  name: "forecastWeather",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getForecastWeather.pending, (state) => {
        state.loading = true;
      })
      .addCase(getForecastWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.forecastWeatherData = action.payload;
      })
      .addCase(getForecastWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      });
  },
});

export default forecastWeatherDataSlice.reducer;
