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
} from "@carbon/react";
import { Temperature, Windy, Cloud } from "@carbon/icons-react";
import "./WeatherCard.css"; // Importing the CSS file

const WeatherCard = () => {
  const { data, loading } = useSelector((state: RootState) => state.weather);

  if (loading) {
    return <InlineLoading description="Loading weather data..." />;
  }

  if (!data) return null;

  return (
    <FlexGrid fullWidth className="weather-grid">
      <Row>
        <Column sm={4} md={6} lg={8}>
          <Tile className="weather-tile">
            <h2 className="weather-title">
              {data.name}, {data.sys.country}
            </h2>

            <Tag type="cool-gray" size="lg" className="weather-tag">
              <Cloud size={16} className="icon" />
              {data.weather[0].main}
            </Tag>

            <Stack gap={3} className="weather-temp-section">
              <h1 className="weather-temp">{Math.round(data.main.temp)}°C</h1>
              <p className="weather-subtext">
                Feels like {Math.round(data.main.feels_like)}°C
              </p>
            </Stack>

            <Stack gap={3} className="weather-details">
              <p className="weather-info">
                <Temperature size={16} className="icon" />
                Humidity: {data.main.humidity}%
              </p>
              <p className="weather-info">
                <Windy size={16} className="icon" />
                Wind Speed: {data.wind.speed} m/s
              </p>
            </Stack>

            <p className="weather-description">{data.weather[0].description}</p>
          </Tile>
        </Column>
      </Row>
    </FlexGrid>
  );
};

export default WeatherCard;
