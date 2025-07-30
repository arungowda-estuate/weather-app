"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Tile, FlexGrid, Row, Column } from "@carbon/react";
import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import "@/app/globals.scss";

export default function Home() {
  const weather = useSelector((state: RootState) => state.weather.data);

  return (
    <main className="app-main">
      <FlexGrid fullWidth>
        <Row>
          <Column sm={4} md={6} lg={8}>
            <Tile className="app-tile">
              <h1 className="app-title">🌤 Weather App</h1>

              <div>
                <SearchBar />
              </div>

              {weather && (
                <div>
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
