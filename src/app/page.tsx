"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Tile } from "@carbon/react";
import { FlexGrid, Row, Column } from "@carbon/react";
import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import styles from "./Home.module.css";

export default function Home() {
  const weather = useSelector((state: RootState) => state.weather.data);

  return (
    <main className={styles.main}>
      <FlexGrid className={styles.grid} fullWidth>
        <Row>
          <Column sm={4} md={6} lg={8} className={styles.centeredColumn}>
            <Tile className={styles.tile}>
              <h1 className={styles.title}>🌤 Weather App</h1>

              <div className={styles.contentWrapper}>
                <SearchBar />
              </div>

              {weather && (
                <div className={styles.contentWrapper}>
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
