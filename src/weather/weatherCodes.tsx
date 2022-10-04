import * as React from 'react';
import styled from 'styled-components';

import './icons.css';

const MaterialSymbol = styled.span.attrs({
  className: 'material-symbols-outlined' as string,
})``;
const getMS = (name: string) => (
  <MaterialSymbol>{name}</MaterialSymbol>
);
const getMSTimely = (name: string) => ({ hour }: { hour: number }) => {
  return getMS(`${name}_${hour >= 12 ? 'night' : 'day'}`);
};

export const weatherCodeIcons = new Map<number, string | JSX.Element | ReturnType<typeof getMSTimely>>([
  [ 0, getMSTimely('clear') ],
  [ 1, getMSTimely('partly_cloudy') ],
  [ 2, getMSTimely('partly_cloudy') ],
  [ 3, getMSTimely('partly_cloudy') ],
  [ 45, getMS('foggy') ],
  [ 48, getMS('foggy') ],
  [ 51, getMS('rainy') ],
  [ 53, getMS('rainy') ],
  [ 55, getMS('rainy') ],
  [ 56, getMS('ac_unit') ],
  [ 57, getMS('ac_unit') ],
  [ 61, getMS('water_drop') ],
  [ 63, getMS('water_drop') ],
  [ 65, getMS('water_drop') ],
  [ 66, getMS('ac_unit') ],
  [ 67, getMS('ac_unit') ],
  [ 71, getMS('weather_snowy') ],
  [ 73, getMS('weather_snowy') ],
  [ 75, getMS('weather_snowy') ],
  [ 77, getMS('grains') ],
  [ 80, getMS('rainy') ],
  [ 81, getMS('rainy') ],
  [ 82, getMS('rainy') ],
  [ 85, getMS('snowing') ],
  [ 86, getMS('snowing') ],
  [ 95, getMS('thunderstorm') ],
  [ 96, getMS('thunderstorm') ],
  [ 99, getMS('thunderstorm') ],
]);

export const weatherCodes = new Map<number, string>([
  [ 0, 'Clear sky' ],
  [ 1, 'Mainly clear, partly cloudy, and overcast' ],
  [ 2, 'Mainly clear, partly cloudy, and overcast' ],
  [ 3, 'Mainly clear, partly cloudy, and overcast' ],
  [ 45, 'Fog and depositing rime fog' ],
  [ 48, 'Fog and depositing rime fog' ],
  [ 51, 'Drizzle: Light, moderate, and dense intensity' ],
  [ 53, 'Drizzle: Light, moderate, and dense intensity' ],
  [ 55, 'Drizzle: Light, moderate, and dense intensity' ],
  [ 56, 'Freezing Drizzle: Light and dense intensity' ],
  [ 57, 'Freezing Drizzle: Light and dense intensity' ],
  [ 61, 'Rain: Slight, moderate and heavy intensity' ],
  [ 63, 'Rain: Slight, moderate and heavy intensity' ],
  [ 65, 'Rain: Slight, moderate and heavy intensity' ],
  [ 66, 'Freezing Rain: Light and heavy intensity' ],
  [ 67, 'Freezing Rain: Light and heavy intensity' ],
  [ 71, 'Snow fall: Slight, moderate, and heavy intensity' ],
  [ 73, 'Snow fall: Slight, moderate, and heavy intensity' ],
  [ 75, 'Snow fall: Slight, moderate, and heavy intensity' ],
  [ 77, 'Snow grains' ],
  [ 80, 'Rain showers: Slight, moderate, and violent' ],
  [ 81, 'Rain showers: Slight, moderate, and violent' ],
  [ 82, 'Rain showers: Slight, moderate, and violent' ],
  [ 85, 'Snow showers slight and heavy' ],
  [ 86, 'Snow showers slight and heavy' ],
  [ 95, 'Thunderstorm: Slight or moderate' ],
  [ 96, 'Thunderstorm with slight and heavy hail' ],
  [ 99, 'Thunderstorm with slight and heavy hail' ],
]);

/*
<span class="material-symbols-outlined">
air
</span>
*/