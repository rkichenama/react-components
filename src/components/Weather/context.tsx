import { createContext } from 'react';

export const WeatherContext = createContext({
  showDescription: true,
  cardCount: 5,
  system: 'us',
  // eslint-disable-next-line no-unused-vars
  setSystem: (system: string) => { /* */ },
});
