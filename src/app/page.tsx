"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Grid, Column, Tile } from "@carbon/react";
import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";

export default function Home() {
  const weather = useSelector((state: RootState) => state.weather.data);

  return (
    <main
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "var(--cds-background)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "fixed", 
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          maxWidth: "42rem",
          padding: "var(--cds-spacing-07)",
        }}
      >
        <Grid fullWidth condensed>
          <Column sm={4} md={6} lg={8}>
            <Tile
              style={{
                padding: "var(--cds-spacing-07)",
                backgroundColor: "var(--cds-layer)",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
                borderRadius: "0.5rem",
              }}
            >
              <h1
                style={{
                  color: "var(--cds-text-primary)",
                  marginBottom: "var(--cds-spacing-05)",
                  textAlign: "center",
                }}
              >
                🌤 Weather App
              </h1>

              <SearchBar />

              {weather && (
                <div
                  style={{
                    marginTop: "var(--cds-spacing-06)",
                  }}
                >
                  <WeatherCard />
                </div>
              )}
            </Tile>
          </Column>
        </Grid>
      </div>
    </main>
  );
}






