import styled from 'styled-components';
import { inputPadding } from '../Input/labelAndInput';

export const DisplayValue = styled.div.attrs({})`
  position: absolute;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: ${inputPadding};
  background-color: transparent;
  pointer-events: none;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const Tag = styled.span`
  &:only-child {
    display: block;
    width: 100%;
  }
  &:not(:only-child) {
    display: inline-block;
    border-radius: 8px / 50%;
    outline: 1px solid;
    padding: 2px 0.5em;
    color: ${({ theme }) => theme.colors.bg};
    background-color: ${({ theme }) => theme.colors.fg};
    margin-right: 0.5em;
  }
`;
