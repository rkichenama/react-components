import * as React from 'react';
import styled from 'styled-components';
import { OpenMeteoResponse } from './types';
import { RelativeDays, RelativeHours } from './utility';
import { weatherCodes, weatherCodeIcons } from './weatherCodes';
import {
  Icon, Temp, Desc, ForecastDeck, Card,
} from './cards';
import { WeatherContext } from './context';

const Attribution = styled.a.attrs({
  href: 'https://open-meteo.com/',
  children: 'Weather data by Open-Meteo.com',
})`
  grid-area: attr;
  font-size: ${({ theme }) => theme.fontSize.sm};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.darkAccent};
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

export function CurrentConditions({ currentWeather: { weathercode: key, temperature } }: OpenMeteoResponse) {
  const { system, setSystem, showDescription } = React.useContext(WeatherContext);

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
      {showDescription && (<Desc>{weatherCodes.get(key) ?? ''}</Desc>)}
      <ToggleSystem>
        <label htmlFor='selectF'>
          <input id='selectF' type='radio' name='system' value='us' checked={system === 'us'} onChange={onChange} />
          °F
        </label>
        <label htmlFor='selectC'>
          <input id='selectC' type='radio' name='system' value='si' checked={system === 'si'} onChange={onChange} />
          °C
        </label>
      </ToggleSystem>
      <Attribution />
    </Currently>
  );
}
export function HourlyForecast({ hourly: { time, temperature2m, weathercode } }: OpenMeteoResponse) {
  const { showDescription, cardCount } = React.useContext(WeatherContext);
  const offset = (new Date()).getHours() + 1;

  return (
    <ForecastDeck className='hourly'>
      {time.slice(offset, offset + cardCount).map((stamp, i) => {
        const index = i + offset;
        const key = weathercode[index];
        let Img = weatherCodeIcons.get(key) ?? '';
        if (Img instanceof Function) {
          Img = (<Img hour={(new Date(stamp)).getHours()} />);
        }
        return (
          <Card
            key={stamp}
            img={Img}
            temp={Math.round(temperature2m[index])}
            desc={showDescription ? (
              <>
                {RelativeHours(stamp)}
                <br />
                {weatherCodes.get(key) ?? ''}
              </>
            ) : undefined}
          />
        );
      })}
    </ForecastDeck>
  );
}
export function DailyForecast({ daily: {
  time, temperature2mMax, temperature2mMin, weathercode,
} }: OpenMeteoResponse) {
  const { showDescription, cardCount } = React.useContext(WeatherContext);

  return (
    <ForecastDeck className='daily'>
      {time.slice(1, cardCount + 1).map((stamp, i) => {
        const index = i + 1;
        const key = weathercode[index];
        let Img = weatherCodeIcons.get(key) ?? '';
        if (Img instanceof Function) {
          Img = (<Img hour={9} />);
        }
        return (
          <Card
            key={stamp}
            img={Img}
            temp={`${Math.round(temperature2mMax[index])}/${Math.round(temperature2mMin[index])}`}
            desc={showDescription ? (
              <>
                {RelativeDays(`${stamp}T00:00`)}
                <br />
                {weatherCodes.get(key) ?? ''}
              </>
            ) : undefined}
          />
        );
      })}
    </ForecastDeck>
  );
}
export const Currently = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(5, 1fr);
  align-self: center;

  &:has(:nth-child(5)) {
    grid-template-rows: repeat(5, 1fr);
    grid-template-areas:
      'temp temp temp icon icon'
      'temp temp temp icon icon'
      'desc desc desc desc desc'
      'desc desc desc desc desc'
      'ctrl ctrl ctrl ctrl ctrl'
      'attr attr attr attr attr';
  }
  &:has(:nth-child(4):is(:last-child)) {
    grid-template-rows: repeat(3, 1fr);
    grid-template-areas:
      'temp temp temp icon icon'
      'temp temp temp icon icon'
      'ctrl ctrl ctrl ctrl ctrl'
      'attr attr attr attr attr';
  }
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
      border-color: currentcolor;
    }
    input {
      display: none;
    }
    &:has(input:checked) {
      font-weight: ${({ theme }) => theme.fontWeight.bold};
      border-style: inset;
      border-color: currentcolor;
    }
  }
`;
