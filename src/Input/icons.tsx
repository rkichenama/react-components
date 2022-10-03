import styled from 'styled-components';

export const OptionalIcon = styled.span.attrs({})`
  flex-basis: min-content;

  &:empty {
    display: none;
  }
`;
export const StatusIcon = styled.span.attrs<{ open?: boolean; }>({}) <{ open?: boolean; }> `
  flex-basis: min-content;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
