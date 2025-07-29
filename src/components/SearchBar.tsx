"use client";

import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherByCity, clearWeather } from "@/features/weatherSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import { TextInput, Button, Stack, InlineNotification } from "@carbon/react";

const SearchBar = () => {
  const [city, setCity] = useState("");
  const [debouncedCity, setDebouncedCity] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const lastClicked = useRef<number>(0);

  const { error } = useSelector((state: RootState) => state.weather);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCity(city);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [city]);

  const handleSearch = () => {
    const now = Date.now();
    if (now - lastClicked.current > 1000) {
      lastClicked.current = now;
      if (debouncedCity.trim()) {
        dispatch(fetchWeatherByCity(debouncedCity));
      }
    }
  };

  return (
    <Stack gap={4}>
      <TextInput
        id="city-search"
        labelText="Enter City"
        placeholder="e.g. London"
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
          dispatch(clearWeather());
        }}
        size="lg"
      />
      <Button onClick={handleSearch} kind="primary" disabled={!city.trim()}>
        Search Weather
      </Button>

      {error && (
        <InlineNotification
          kind="error"
          title="Error"
          subtitle={error}
          lowContrast
        />
      )}
    </Stack>
  );
};

export default SearchBar;
