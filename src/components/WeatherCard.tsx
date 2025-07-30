"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import {
  Tile,
  InlineLoading,
  Stack,
  Tag,
  FlexGrid,
  Row,
  Column,
  UnorderedList,
} from "@carbon/react";
import {
  Temperature,
  Windy,
  Cloud,
  Sunrise,
  Sunset,
  Pressure,
  View,
} from "@carbon/icons-react";
import "@/app/globals.scss";

interface WeatherData {
  name: string;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    temp_min: number;
    temp_max: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  weather: {
    main: string;
    description: string;
  }[];
  visibility?: number;
}

const WeatherCard = () => {
  const { data, loading } = useSelector((state: RootState) => state.weather);

  if (loading) {
    return <InlineLoading description="Loading weather data..." />;
  }

  if (!data) return null;

  const weatherData = data as WeatherData;

  return (
    <FlexGrid fullWidth className="weather-container">
      <Row>
        <Column sm={4} md={6} lg={16}>
          <Tile>
            <h2>
              {weatherData.name}, {weatherData.sys.country}
            </h2>

            <Tag type="cool-gray" size="lg">
              <Cloud size={16} className="icon" />
              {weatherData.weather[0].main}
            </Tag>

            <Stack gap={3}>
              <UnorderedList nested={false}>
                <li>
                  <Temperature size={16} /> Temperature: {weatherData.main.temp}
                  °C
                </li>
                <li>
                  <Temperature size={16} /> Feels Like:{" "}
                  {weatherData.main.feels_like}°C
                </li>
                <li>
                  <Temperature size={16} /> Humidity:{" "}
                  {weatherData.main.humidity}%
                </li>
                <li>
                  <Windy size={16} /> Wind Speed: {weatherData.wind.speed} m/s
                </li>
                <li>
                  <Cloud size={16} /> Weather:{" "}
                  {weatherData.weather[0].description}
                </li>
                <li>
                  <Pressure size={16} /> Pressure: {weatherData.main.pressure}{" "}
                  hPa
                </li>
                <li>
                  <Temperature size={16} /> Min Temp:{" "}
                  {weatherData.main.temp_min}°C
                </li>
                <li>
                  <Temperature size={16} /> Max Temp:{" "}
                  {weatherData.main.temp_max}°C
                </li>
                <li>
                  <Sunrise size={16} /> Sunrise:{" "}
                  {new Date(
                    weatherData.sys.sunrise * 1000
                  ).toLocaleTimeString()}
                </li>
                <li>
                  <Sunset size={16} /> Sunset:{" "}
                  {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
                </li>
                <li>
                  <Windy size={16} /> Wind Direction: {weatherData.wind.deg}°
                </li>
                {weatherData.visibility !== undefined && (
                  <li>
                    <View size={16} /> Visibility:{" "}
                    {weatherData.visibility / 1000} km
                  </li>
                )}
              </UnorderedList>
            </Stack>
          </Tile>
        </Column>
      </Row>
    </FlexGrid>
  );
};

export default WeatherCard;
