import * as React from 'react';
import styled from 'styled-components';

export interface HexagonPanelProps {
  copy?: string;
  image?: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}
const HexagonPanel = ({
  copy, image, width, height, style,
}: HexagonPanelProps) => (
  <OuterPane {...{
    image, width, height, style,
  }}
  >
    <InnerPane>
      {copy}
    </InnerPane>
  </OuterPane>
);

export const OuterPane = styled.div<{ image?: string; width?: number; height?: number; }>`
  ${({ width, height }) => (
    width || height
      ? width
        ? `width: ${width}ic;`
        : `height: ${height}ic;`
      : ''
  )}
  line-height: 1ic;
  aspect-ratio: 1 / 0.8661;
  background-color: cyan;
  ${({ image }) => (image
    ? `background-image: url(${image});`
    : '')}
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  text-align: center;
  overflow: hidden;
  clip-path: polygon(
    /* top left */
    25% 0%,
    /* top right */
    75% 0%,

    /* right center */
    100% 50%,

    /* right bottom */
    75% 100%,
    /* left bottom */
    25% 100%,

    /* left center */
    0% 50%
  );

  &::before,
  & > :only-child::before {
    content: '';
    width: 50%;
    height: 100%;
    shape-margin: 2px;
  }
  &::before {
    float: left;
    shape-outside: polygon(
      0 0,
      50% 0,
      0 50%,
      50% 100%,
      0 100%
    );
  }
  & > :only-child::before {
    float: right;
    shape-outside: polygon(
      50% 0,
      100% 0,
      100% 100%,
      50% 100%,
      100% 50%
    );
  }
`;
const InnerPane = styled.div`
  display: inline;
  word-break: break-all;
  overflow-y: auto;
`;

export default HexagonPanel;
