import * as React from 'react';
import styled from 'styled-components';
import { OpenMeteoResponse } from './types';
import { RelativeDays, RelativeHours } from './utility';
import { weatherCodes, weatherCodeIcons } from "./weatherCodes";
import { fetchWeather } from './fetchWeather';

const WeatherContext = React.createContext({
  system: 'us',
  setSystem: (system: string) => {}
 });

const CurrentConditions = ({ currentWeather: { weathercode: key, temperature } }: OpenMeteoResponse) => {
  const { system, setSystem } = React.useContext(WeatherContext);

  let Img = weatherCodeIcons.get(key) ?? '';
  if (Img instanceof Function) {
    Img = (<Img hour={(new Date()).getHours()} />);
  }

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (target.checked) {
      setSystem(target.value);
    }
  };

  return (
    <Currently>
      <Icon>{Img}</Icon>
      <Temp>{Math.round(temperature)}</Temp>
      <Desc>{weatherCodes.get(key) ?? ''}</Desc>
      <ToggleSystem>
        <label>
          <input type='radio' name='system' value='us' checked={system === 'us'} onChange={onChange} />
          °F
        </label>
        <label>
          <input type='radio' name='system' value='si' checked={system === 'si'} onChange={onChange} />
          °C
        </label>
      </ToggleSystem>
    </Currently>
  );
}
const HourlyForecast = ({ hourly: { time, temperature2m, weathercode } }: OpenMeteoResponse) => {
  const offset = (new Date()).getHours() + 1;

  return (
    <ForecastDeck className='hourly'>
      {
        time.slice(offset, offset + 5).map((stamp, i) => {
          const index = i + offset;
          const key = weathercode[index];
          let Img = weatherCodeIcons.get(key) ?? '';
          if (Img instanceof Function) {
            Img = (<Img hour={(new Date(stamp)).getHours()}/>);
          }

          return (
            <ForcastCard key={stamp}>
              <Icon>{Img}</Icon>
              <Temp>{Math.round(temperature2m[index])}</Temp>
              <Desc>
                {RelativeHours(stamp)}<br />
                {weatherCodes.get(key) ?? ''}
              </Desc>
            </ForcastCard>
          );
        })
      }
    </ForecastDeck>
  );
};
const DailyForecast = ({ daily: { time, temperature2mMax, temperature2mMin, weathercode } }: OpenMeteoResponse) => (
  <ForecastDeck className='daily'>
    {
      time.slice(1, 6).map((stamp, i) => {
        const index = i + 1;
        const key = weathercode[index];
        let Img = weatherCodeIcons.get(key) ?? '';
        if (Img instanceof Function) {
          Img = (<Img hour={9} />);
        }

        return (
          <ForcastCard key={stamp}>
            <Icon>{Img}</Icon>
            <Temp>
              {Math.round(temperature2mMax[index])}/{Math.round(temperature2mMin[index])}
            </Temp>
            <Desc>
              {RelativeDays(`${stamp}T00:00`)}<br />
              {weatherCodes.get(key) ?? ''}
            </Desc>
          </ForcastCard>
        );
      })
    }
  </ForecastDeck>
);

const Currently = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-template-areas:
    'temp temp temp icon icon'
    'temp temp temp icon icon'
    'desc desc desc desc desc'
    'desc desc desc desc desc'
    'ctrl ctrl ctrl ctrl ctrl';
  align-self: center;
`;
const ToggleSystem = styled.div`
  grid-area: ctrl;
  display: flex;
  align-items: center;

  > label {
    flex: 1;
    text-align: center;
    border: 1px solid transparent;

    &:hover {
      border-style: outset;
      border-color: currentColor;
    }
    input {
      display: none;
    }
    &:has(input:checked) {
      font-weight: ${({ theme }) => theme.fontWeight.bold};
      border-style: inset;
      border-color: currentColor;
    }
  }
`;
const ForecastDeck = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1ex;
`;
const ForcastCard = styled.li`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-template-areas:
    'temp temp temp icon icon'
    'temp temp temp icon icon'
    'desc desc desc desc desc'
    'desc desc desc desc desc';
`;
const Temp = styled.div`
  grid-area: temp;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${({ theme }) => theme.fontSize.xl};
`;
const Icon = styled.div`
  grid-area: icon;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize.xl};
`;
const Desc = styled.div`
  grid-area: desc;
`;

const Weather = () => {
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
    <WeatherContext.Provider value={{ system, setSystem }}>
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
  grid-template-rows: repeat(2, 1fr);
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
