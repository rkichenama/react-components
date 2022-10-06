import styled from 'styled-components';

export const OptionalInfo = styled.div<{ isInvalid: boolean }>`
  display: flex;
  align-items: flex-start;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme, isInvalid }) => (
    isInvalid
      ? theme.colors.alert.danger
      : theme.colors.fg
  )}
`;
export const Message = styled.div`
  flex: 1;
`;
export const Count = styled.div`
  white-space: nowrap;

  &:empty {
    display: none;
  }
`;
