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
    <FlexGrid fullWidth className="weather-grid">
      <Row>
        <Column sm={4} md={6} lg={8}>
          <Tile>
            <h2>
              {weatherData.name}, {weatherData.sys.country}
            </h2>

            <Tag type="cool-gray" size="lg">
              <Cloud size={16} className="icon" />
              {weatherData.weather[0].main}
            </Tag>

            <Stack gap={5}>
              <UnorderedList nested={false}>
                <Temperature size={16} />
                Temperature: {weatherData.main.temp}°C
                <br />
                <Temperature size={16} />
                Feels Like: {weatherData.main.feels_like}°C
                <br />
                <Temperature size={16} />
                Humidity: {weatherData.main.humidity}%
                <br />
                <Windy size={16} />
                Wind Speed: {weatherData.wind.speed} m/s
                <br />
                <Cloud size={16} />
                Weather: {weatherData.weather[0].description}
                <br />
                <Pressure size={16} /> Pressure:
                {weatherData.main.pressure} hPa
                <br />
                <Temperature size={16} /> Min Temp:
                {weatherData.main.temp_min}°C
                <br />
                <Temperature size={16} /> Max Temp:
                {weatherData.main.temp_max}°C
                <br />
                <Sunrise size={16} /> Sunrise:
                {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}
                <br />
                <Sunset size={16} /> Sunset:
                {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
                <br />
                <Windy size={16} /> Wind Direction:
                {weatherData.wind.deg}°
                <br />
                {weatherData.visibility !== undefined && (
                  <>
                    <View size={16} /> Visibility:{" "}
                    {weatherData.visibility / 1000} km
                  </>
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
