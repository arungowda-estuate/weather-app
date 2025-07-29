/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

interface WeatherState {
  loading: boolean;
  data: any;
  error: string | null;
}

const initialState: WeatherState = {
  loading: false,
  data: null,
  error: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setWeatherData: (state, action) => {
      state.data = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearWeather: (state) => {
      state.data = null;
      state.error = null;
    },
  },
});

export const { setLoading, setWeatherData, setError, clearWeather } =
  weatherSlice.actions;
export default weatherSlice.reducer;
