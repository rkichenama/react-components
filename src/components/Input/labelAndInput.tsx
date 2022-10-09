import styled, { css } from 'styled-components';
import { LabelProps } from './types';

export const inputPadding = '0.25em 0.25em';
export const Container = styled.div.attrs<{ size?: number; }>({}) <{ size?: number; }>`
  max-width: 500px;
  ${({ size }) => (size ? `width: ${size}ex;` : '')}

  &,
  & * {
    box-sizing: border-box;
  }
`;
const activeLabelStyle = css`
  transform: translate(-1ex, -75%);
  font-size: ${({ theme }) => theme.fontSize.sm};
  background-color: ${({ theme }) => theme.colors.bg};
`;

export const Label = styled.label.attrs<LabelProps>({}) <LabelProps>`
  position: absolute;
  padding: 2px 4px;
  left: ${({ hasIcon }) => (hasIcon ? 2 : 1)}ex;
  transition: transform 0.2s ease-in-out;
  ${({ active }) => (active ? activeLabelStyle : '')}

  &:empty {
    display: none;
  }
`;
export const FakeInput = styled.div<{ isInvalid: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  outline: 1px solid ${({ theme, isInvalid }) => (
    isInvalid
      ? theme.colors.alert.danger
      : theme.colors.grays.jet
  )};
  font-size: ${({ theme }) => theme.fontSize.reg};
  background-color: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.fg};

  &:not(:focus-within):hover {
    outline: 1px solid ${({ theme, isInvalid }) => (
    isInvalid
      ? theme.colors.alert.danger
      : theme.colors.alert.info
  )};
  }
  &:focus-within {
    outline: 2px solid ${({ theme, isInvalid }) => (
    isInvalid
      ? theme.colors.alert.danger
      : theme.colors.alert.info
  )};

    ${Label} {
      ${activeLabelStyle}
    }
  }
`;
export const ValueOverlay = styled.div`
  position: relative;
  flex: 1;
`;
export const Input = styled.input.attrs({
  type: 'text',
})`
  width: 100%;
  height: 100%;
  border: none;
  padding: ${inputPadding};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.fg};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  outline: none;
`;
