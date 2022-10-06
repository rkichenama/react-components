import * as React from 'react';
import styled from 'styled-components';
import { OpenMeteoResponse, WeatherProps } from './types';
import { fetchWeather } from './fetchWeather';
import { CurrentConditions, HourlyForecast, DailyForecast, Currently } from './sections';

export const WeatherContext = React.createContext({
  showDescription: true,
  cardCount: 5,
  system: 'us',
  setSystem: (system: string) => {}
 });

const Weather = ({ cardCount = 5, showDescription = true }: WeatherProps) => {
  const [system, setSystem] = React.useState('us');
  const [forecast, setForecast] = React.useState<OpenMeteoResponse | { error: any }>({} as OpenMeteoResponse);

  React.useEffect(() => {
    fetchWeather(setForecast, system);
  }, [system]);

  if (!Object.keys(forecast).length) {
    return <div>Loading...</div>;
  }

  return 'error' in forecast ? (
    <div>An error occurred</div>
  ) : (
    <WeatherContext.Provider value={{ system, setSystem, cardCount, showDescription }}>
      <Conditions>
        <CurrentConditions {...forecast} />
        <HourlyForecast {...forecast} />
        <DailyForecast {...forecast} />
      </Conditions>
    </WeatherContext.Provider>
  );
};

const Conditions = styled.div`
  font-family: ${({ theme }) => theme.fonts.firaSans};
  display: grid;
  width: 100%;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: max-content;
  grid-template-areas:
    'currently hourly hourly hourly hourly hourly'
    'currently daily daily daily daily daily';

  ${Currently} {
    grid-area: currently;
  }
  .hourly {
    grid-area: hourly;
  }
  .daily {
    grid-area: daily;
  }
`;

export default Weather;
