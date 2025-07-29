"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Tile, FlexGrid, Row, Column } from "@carbon/react";
import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import "./Home.scss";

export default function Home() {
  const weather = useSelector((state: RootState) => state.weather.data);

  return (
    <main className="home-main">
      <FlexGrid fullWidth className="home-grid">
        <Row>
          <Column sm={4} md={6} lg={8} className="home-centered-column">
            <Tile className="home-tile">
              <h1 className="home-title">🌤 Weather App</h1>

              <div className="home-content-wrapper">
                <SearchBar />
              </div>

              {weather && (
                <div className="home-content-wrapper weather-gap">
                  <WeatherCard />
                </div>
              )}
            </Tile>
          </Column>
        </Row>
      </FlexGrid>
    </main>
  );
}
