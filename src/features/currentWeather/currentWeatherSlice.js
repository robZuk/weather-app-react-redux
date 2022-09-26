import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import currentWeatherService from "./currentWeatherService";

const initialState = {
  currentWeatherData: {},
  error: false,
  loading: false,
};

//Get current weather data
export const getCurrentWeather = createAsyncThunk(
  "currentWeather/getAll",
  async (location, thunkAPI) => {
    try {
      return await currentWeatherService.getCurrentWeatherData(location);
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

export const currentWeatherDataSlice = createSlice({
  name: "currentWeather",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getCurrentWeather.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.currentWeatherData = action.payload;
      })
      .addCase(getCurrentWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      });
  },
});

export default currentWeatherDataSlice.reducer;
