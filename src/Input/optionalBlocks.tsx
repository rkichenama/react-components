import styled from 'styled-components';

export const OptionalInfo = styled.div.attrs({})`
  display: flex;
  align-items: flex-start;
  font-size: ${({ theme }) => theme.fontSize.sm};
`;
export const Message = styled.div.attrs({})`
  flex: 1;
`;
export const Count = styled.div.attrs({})`
  white-space: nowrap;

  &:empty {
    display: none;
  }
`;
