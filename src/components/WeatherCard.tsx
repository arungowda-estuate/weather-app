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
  ListItem,
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
import "./WeatherCard.scss";

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
    <FlexGrid fullWidth className="weather-grid">
      <Row>
        <Column sm={4} md={6} lg={8}>
          <Tile className="weather-tile">
            <h2 className="weather-title">
              {weatherData.name}, {weatherData.sys.country}
            </h2>

            <Tag type="cool-gray" size="lg" className="weather-tag">
              <Cloud size={16} className="icon" />
              {weatherData.weather[0].main}
            </Tag>

            <Stack gap={5} className="weather-details">
              <UnorderedList nested={false}>
                <ListItem>
                  <Temperature size={16} className="icon" /> Temperature:{" "}
                  {Math.round(weatherData.main.temp)}°C
                </ListItem>
                <ListItem>
                  <Temperature size={16} className="icon" /> Feels Like:{" "}
                  {Math.round(weatherData.main.feels_like)}°C
                </ListItem>
                <ListItem>
                  <Temperature size={16} className="icon" /> Humidity:{" "}
                  {weatherData.main.humidity}%
                </ListItem>
                <ListItem>
                  <Windy size={16} className="icon" /> Wind Speed:{" "}
                  {weatherData.wind.speed} m/s
                </ListItem>
                <ListItem>
                  <Cloud size={16} className="icon" /> Weather:{" "}
                  {weatherData.weather[0].description}
                </ListItem>
                <ListItem>
                  <Pressure size={16} className="icon" /> Pressure:{" "}
                  {weatherData.main.pressure} hPa
                </ListItem>
                <ListItem>
                  <Temperature size={16} className="icon" /> Min Temp:{" "}
                  {Math.round(weatherData.main.temp_min)}°C
                </ListItem>
                <ListItem>
                  <Temperature size={16} className="icon" /> Max Temp:{" "}
                  {Math.round(weatherData.main.temp_max)}°C
                </ListItem>
                <ListItem>
                  <Sunrise size={16} className="icon" /> Sunrise:{" "}
                  {new Date(
                    weatherData.sys.sunrise * 1000
                  ).toLocaleTimeString()}
                </ListItem>
                <ListItem>
                  <Sunset size={16} className="icon" /> Sunset:{" "}
                  {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
                </ListItem>
                <ListItem>
                  <Windy size={16} className="icon" /> Wind Direction:{" "}
                  {weatherData.wind.deg}°
                </ListItem>
                {weatherData.visibility && (
                  <ListItem>
                    <View size={16} className="icon" /> Visibility:{" "}
                    {weatherData.visibility / 1000} km
                  </ListItem>
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
