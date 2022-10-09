import * as React from 'react';
import styled from 'styled-components';
import { OpenMeteoResponse, WeatherProps } from './types';
import { fetchWeather } from './fetchWeather';
import {
  CurrentConditions, HourlyForecast, DailyForecast, Currently,
} from './sections';
import { WeatherContext } from './context';

function Weather({ cardCount = 5, showDescription = true }: WeatherProps) {
  const [system, setSystem] = React.useState('us');
  const [forecast, setForecast] = React.useState<OpenMeteoResponse | { error: any }>({} as OpenMeteoResponse);

  const value = React.useMemo(() => ({
    system, setSystem, cardCount, showDescription,
  }), [cardCount, showDescription, system]);
  React.useEffect(() => {
    fetchWeather(setForecast, system);
  }, [system]);

  if (!Object.keys(forecast).length) {
    return <div>Loading...</div>;
  }

  return 'error' in forecast ? (
    <div>An error occurred</div>
  ) : (
    <WeatherContext.Provider {...{ value }}>
      <Conditions>
        <CurrentConditions {...forecast} />
        <HourlyForecast {...forecast} />
        <DailyForecast {...forecast} />
      </Conditions>
    </WeatherContext.Provider>
  );
}

const Conditions = styled.div`
  font-family: ${({ theme }) => theme.fonts.firaSans};
  color: ${({ theme }) => theme.colors.fg};
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
