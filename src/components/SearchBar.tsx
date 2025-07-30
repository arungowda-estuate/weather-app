"use client";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setLoading,
  setWeatherData,
  setError,
  clearWeather,
} from "@/redux/features/weatherSlice";
import type { AppDispatch } from "@/redux/store";
import { Button, Stack, TextInput } from "@carbon/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "@/app/globals.scss";

const SearchBar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [apiError, setApiError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    const fetchWeather = async () => {
      if (!query) return;

      dispatch(clearWeather());
      dispatch(setLoading(true));
      setApiError(null);

      try {
        const apiKey =
          process.env.PUBLIC_OPENWEATHER_API_KEY ||
          "26d9b70b8b63f8780baa9a15f603dcc5";

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
          throw new Error(`City not found for "${query}"`);
        }

        const data = await response.json();
        dispatch(setWeatherData(data));
      } catch (error) {
        if (error instanceof Error) {
          setApiError(error.message);
          dispatch(setError(error.message));
        }
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchWeather();
  }, [query, dispatch]);

  const formik = useFormik({
    initialValues: {
      city: "",
    },
    validationSchema: Yup.object({
      city: Yup.string().required("City name is required"),
    }),
    onSubmit: (values) => {
      setQuery(values.city);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack orientation="horizontal" gap={3}>
        <div>
          <TextInput
            id="city-search"
            labelText="Search city weather"
            placeholder="e.g. London"
            size="lg"
            role="searchbox"
            type="text"
            required
            invalid={
              (formik.touched.city && Boolean(formik.errors.city)) ||
              Boolean(apiError)
            }
            invalidText={
              formik.touched.city && formik.errors.city
                ? formik.errors.city
                : apiError && !formik.errors.city
                ? apiError
                : ""
            }
            onChange={(e) => {
              formik.setFieldValue("city", e.target.value);
              setApiError(null);
              dispatch(clearWeather());
            }}
            onBlur={formik.handleBlur}
          />
        </div>

        <Button type="submit" className="searchbar-button">
          Search
        </Button>
      </Stack>
    </form>
  );
};

export default SearchBar;
