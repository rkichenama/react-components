/* istanbul ignore file */

import * as React from 'react';
import styled from 'styled-components';

/* istanbul ignore next */
export const Spinner = (props: any = {}) => (
  <Svg {...props}>
    <Path>
      <Animate />
    </Path>
  </Svg>
);

const Svg = styled.svg.attrs({
  xmlns: 'http://www.w3.org/2000/svg',
  width: 48,
  height: 48,
  viewBox: '0 0 100 100',
  perserveAspectRatio: 'xMidYMid',
})`
  display: block;
`;
const Path = styled.path.attrs({
  d: 'M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40C88.6 30 95 43.3 95 50s-6.4 20-19.3 20c-19.3 0-32.1-40-51.4-40z',
})`
  scale: -1;
  rotate: 90deg;
  transform-origin: 50px 50px;
  stroke: ${({ theme }) => theme.colors.alert.info};
  stroke-linecap: round;
  stroke-dasharray: 175.48047119140625 82.10845703125;
  stroke-width: 5;
  fill: none;
  filter: drop-shadow(0px 0px 0px black);
`;
const Animate = styled.div.attrs({
  as: 'animate',
  attributeName: 'stroke-dashoffset',
  repeatCount: 'indefinite',
  dur: '1.36986301369863s',
  keyTimes: '0;1',
  values: '0;256.58892822265625',
})``;