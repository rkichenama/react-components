import styled, { css } from 'styled-components';

export const OptionalIcon = styled.span.attrs({})`
  flex-basis: min-content;

  &:empty {
    display: none;
  }
`;
export const StatusIcon = styled.span.attrs<{ open?: boolean; }>({})<{ open?: boolean; }>(({ open }) => css`
  flex-basis: min-content;
  display: flex;
  align-items: center;
  cursor: pointer;

  > * {
    rotate: ${open ? -90 : 90}deg;
    transition: rotate 0.2s ease-in-out;
  }
`);
