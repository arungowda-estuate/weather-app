'use client';

import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import { Tile, Grid, Column, InlineLoading } from '@carbon/react';

const WeatherCard = () => {
  const { data, loading, error } = useSelector((state: RootState) => state.weather);

  if (loading) {
    return <InlineLoading description="Loading weather data..." />;
  }

  if (error) {
    return <p style={{ color: 'var(--cds-support-error)' }}>Error: {error}</p>;
  }

  if (!data) return null;

  return (
    <Grid fullWidth style={{ marginTop: '2rem' }}>
      <Column sm={4} md={6} lg={8}>
        <Tile style={{ backgroundColor: 'var(--cds-layer)', padding: '2rem' }}>
          <h3 style={{ color: 'var(--cds-text-primary)' }}>
            {data.name}, {data.sys.country}
          </h3>
          <p style={{ color: 'var(--cds-text-secondary)' }}>
            Temperature: <strong>{data.main.temp}°C</strong>
          </p>
          <p style={{ color: 'var(--cds-text-secondary)' }}>
            Feels Like: {data.main.feels_like}°C
          </p>
          <p style={{ color: 'var(--cds-text-secondary)' }}>
            Weather: {data.weather[0].main} — {data.weather[0].description}
          </p>
          <p style={{ color: 'var(--cds-text-secondary)' }}>
            Wind: {data.wind.speed} m/s
          </p>
        </Tile>
      </Column>
    </Grid>
  );
};

export default WeatherCard;
