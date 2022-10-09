import * as React from 'react';
import styled from 'styled-components';

export const ForecastDeck = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1ex;
`;
export function Card({ img, temp, desc }: { img: string | JSX.Element; temp: string | number; desc?: JSX.Element; }) {
  return (
    <ForcastCard>
      <Icon>{img}</Icon>
      <Temp>{temp}</Temp>
      {desc && <Desc>{desc}</Desc>}
    </ForcastCard>
  );
}
const ForcastCard = styled.li`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(5, 1fr);

  &:has(:nth-child(3)) {
    grid-auto-rows: min-content;
    grid-template-areas:
      'temp temp temp icon icon'
      'temp temp temp icon icon'
      'desc desc desc desc desc';
  }
  &:has(:nth-child(2):is(:last-child)) {
    grid-auto-rows: min-content;
    grid-template-areas: 'temp temp temp icon icon';
  }
`;
export const Temp = styled.div`
  grid-area: temp;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${({ theme }) => theme.fontSize.xl};
`;
export const Icon = styled.div`
  grid-area: icon;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize.xl};
`;
export const Desc = styled.div`
  grid-area: desc;
`;
