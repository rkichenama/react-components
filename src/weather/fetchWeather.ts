import { camelizeKeys } from 'humps';
import { OpenMeteoResponse } from './types';

const units = {
  us: {
    temperature_unit: 'fahrenheit',
    precipitation_unit: 'inch',
  },
  si: {
    temperature_unit: 'celsius',
    precipitation_unit: 'mm',
  },
};
const baseOptions = {
  current_weather: 'true',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  hourly: 'temperature_2m,weathercode',
  daily: 'temperature_2m_max,temperature_2m_min,precipitation_hours,weathercode',
};
export const fetchWeather = (lisener: (json: OpenMeteoResponse | { error: any; }) => void, unit: string = 'us') => {
  navigator.geolocation.getCurrentPosition(
    async ({ coords: { latitude, longitude } }) => {
      const params = new URLSearchParams({
        ...baseOptions,
        ...units[unit],
        latitude: `${latitude}`,
        longitude: `${longitude}`,
      })
        .toString()
        .replace(/%2C/gi, ',');

      lisener(
        camelizeKeys(
          await window.fetch(`https://api.open-meteo.com/v1/forecast?${params}`).then(response => response.json())
        )
      );
    },
    error => {
      lisener({ error });
    }
  );
};
