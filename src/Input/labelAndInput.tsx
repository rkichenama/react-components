import styled, { css } from 'styled-components';

// todo maybe externalize
const inputPadding = '0.25em 0.25em';
export const Container = styled.div.attrs<{ size?: number; }>({}) <{ size?: number; }> `
  max-width: 500px;
  ${({ size }) => size ? `width: ${size}ex;` : ''}

  &, & * {
    box-sizing: border-box;
  }
`;
const activeLabelStyle = css`
  transform: translate(-1ex, -75%);
  font-size: ${({ theme }) => theme.fontSize.sm};
  background-color: ${({ theme }) => theme.colors.bg};
`;
export const Label = styled.label.attrs<{ active: boolean; hasIcon: boolean; }>({}) <{ active: boolean; hasIcon: boolean; }> `
  position: absolute;
  padding: 2px 4px;
  left: ${({ hasIcon }) => hasIcon ? 2 : 1}ex;
  transition: transform 0.2s ease-in-out;
  ${({ active }) => active ? activeLabelStyle : ''}

  &:empty {
    display: none;
  }
`;
export const FakeInput = styled.div.attrs({})`
  position: relative;
  display: flex;
  align-items: center;
  outline: 1px solid ${({ theme }) => theme.colors.fg};
  font-size: ${({ theme }) => theme.fontSize.reg};

  &:not(:focus-within):hover {
    outline: 1px solid ${({ theme }) => theme.colors.alert.info};
  }
  &:focus-within {
    outline: 2px solid ${({ theme }) => theme.colors.alert.info};

    ${Label} {
      ${activeLabelStyle}
    }
  }
`;
export const ValueOverlay = styled.div.attrs({})`
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
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  outline: none;
`;
