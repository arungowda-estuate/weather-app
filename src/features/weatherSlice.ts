/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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

export const fetchWeatherByCity = createAsyncThunk(
  "weather/fetchByCity",
  async (city: string) => {
    const apiKey =
      process.env.PUBLIC_OPENWEATHER_API_KEY ||
      "26d9b70b8b63f8780baa9a15f603dcc5";
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!res.ok) throw new Error("City not found");
    return res.json();
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    clearWeather: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherByCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherByCity.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWeatherByCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch weather";
      });
  },
});
export const { clearWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
