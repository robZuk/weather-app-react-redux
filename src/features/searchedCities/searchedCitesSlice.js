import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import searchedCitiesService from "./searchedCitiesService";

const initialState = {
  searchedCities: [],
  error: false,
  loading: false,
};

//Get searched cities
export const getSearchedCities = createAsyncThunk(
  "searchedCities/getAll",
  async (city, thunkAPI) => {
    try {
      return await searchedCitiesService.getSearchedCities(city);
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

export const searchedCitiesSlice = createSlice({
  name: "searchedCities",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchedCities.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSearchedCities.fulfilled, (state, action) => {
        state.loading = false;
        state.searchedCities = action.payload;
      })
      .addCase(getSearchedCities.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = searchedCitiesSlice.actions;
export default searchedCitiesSlice.reducer;
