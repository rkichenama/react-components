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
        <a className='attribution' href='https://open-meteo.com/'>Weather data by Open-Meteo.com</a>
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
    'currently daily daily daily daily daily'
    'attribution empty empty empty empty empty';

  ${Currently} {
    grid-area: currently;
  }
  .hourly {
    grid-area: hourly;
  }
  .daily {
    grid-area: daily;
  }
  > a.attribution {
    grid-area: attribution;
  }
`;

export default Weather;
