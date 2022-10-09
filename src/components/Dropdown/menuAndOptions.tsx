import * as React from 'react';
import styled, { css } from 'styled-components';
import { SmallCheck } from '../../icons';
import { DropdownOption } from './types';

export const Menu = styled.div<{ cursor: number; }>(({ cursor }) => css`
  position: absolute;
  left: 0;
  right: 0;
  top: calc(100% + 4px);
  border: 1px solid;
  z-index: 100;
  background: ${({ theme }) => theme.colors.bg};

  ${ItemDisplay} {
    &[data-index='${cursor}'] {
      cursor: pointer;
      outline: 1px solid ${({ theme }) => theme.colors.alert.info};
      color: ${({ theme }) => theme.colors.alert.info};
    }
  }
`);
type OptionItem = DropdownOption<any> & {
  selected?: boolean;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};
const ItemDisplay = styled.div<OptionItem>`
  display: flex;
  padding: 0.125em 0.25em;
`;
export function Item({
  label, value, selected, index, ...rest
}: OptionItem & { index: number; }) {
  return (
    <ItemDisplay {...{ label, value, ...rest }} data-index={index}>
      <ItemSelected>
        {selected && (<SmallCheck />)}
      </ItemSelected>
      <ItemValue>{label || value}</ItemValue>
    </ItemDisplay>
  );
}
const ItemSelected = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-basis: 1.5em;
  color: ${({ theme }) => theme.colors.alert.info};
`;
const ItemValue = styled.div`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
