import * as React from 'react';
import styled, { css } from 'styled-components';

import { Info, RightArrow as Caret, Close, ThumbsUp } from '../icons';
import { DropdownOption, DropdownProps } from './types';

const Dropdown = ({
  size, label, value, onChange, options, helperText, validationMessage, maxCharacters, placeholder,
  ...field
}: DropdownProps): JSX.Element => {
  const [open, setOpen] = React.useState(false);
  const [cursor, setCursor] = React.useState(-1);

  const hasValue = React.useMemo(() => !!value?.length, [value]);
  const asInput = React.useMemo(() => !options?.length, [options]);
  const selected = React.useMemo(() => {
    if (options?.length && Array.isArray(value) && value.length) {
      return options.filter(({ value: id }) => value.includes(id));
    }
    return [];
  }, [options, value]);

  const handleCursor = React.useCallback(({ key }: React.KeyboardEvent<HTMLInputElement>) => {
    if (!options?.length) { return; }
    switch (key) {
      case 'Enter':
        if (!open) {
          setOpen(true);
        } else {
          onChange(options[cursor].value);
          setOpen(false);
        }
        break;
      case 'ArrowUp':
      case 'ArrowDown': {
        setCursor(cursor => (
          Math.max(0,
            Math.min(options.length - 1,
              cursor + (key === 'ArrowUp' ? -1 : 1)
            )
          )
        ));
        break;
      }
      case 'Escape':
        setOpen(false);
        break;
    }
  }, [options, open, onChange, cursor]);

  const inputOptions = React.useMemo(() => ({
    ...field,
    ...(asInput ? {value} : { value: '' }),
    onClick (evt: React.MouseEvent<HTMLInputElement>) {
      field?.onClick?.(evt);
      console.log({asInput})
      if (!asInput) {
        setOpen(open => !open);
      }
    },
    onChange (evt: React.ChangeEvent<HTMLInputElement>) {
      // when there are no options, return the typed in value
      if (asInput) {
        onChange?.(evt.target.value as string);
      }
    },
    onKeyDown (evt: React.KeyboardEvent<HTMLInputElement>) {
      field?.onKeyDown?.(evt);
      handleCursor(evt);
    },
    // onFocus () {},
    // onBlur () {},
  }), [field, value, onChange]);



  return (
    <Container {...{ size }}>
      <FakeInput>
        {(label || placeholder) && (
          <Label active={hasValue}>
            {hasValue ? label : placeholder ?? label}
          </Label>)}
        <OptionalIcon></OptionalIcon>
        <ValueOverlay>
          <Input {...inputOptions} />
          {(!asInput && !!selected.length) && (
            <DisplayValue>
              {selected.map(({ value, label = value }) => (
                <Tag key={label}>{label}</Tag>
              ))}
            </DisplayValue>
          )}
        </ValueOverlay>
        <StatusIcon {...{ open }} onClick={() => { setOpen(open => !open)}} >
          {options?.length
            ? <Caret/>
            : (hasValue && <Close />)
          }
        </StatusIcon>
        {open && <Menu>
          {options?.map((option, index) => (
            <Item key={option.value} {...option} active={cursor === index}
              selected={selected.some(({ value }) => value === option.value)}
              onMouseEnter={() => { setCursor(index); }}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            />
          ))}
        </Menu>}
      </FakeInput>
      <OptionalInfo>
        <Message>{validationMessage || helperText}</Message>
        <Count>{
          (!!maxCharacters && asInput) && (
            <>
              {value.length} / {maxCharacters}
            </>
          )
        }</Count>
      </OptionalInfo>
    </Container>
  );
};

// todo maybe externalize
const inputPadding = '0.25em 0.25em';

const Container = styled.div.attrs<{ size?: number }>({})<{ size?: number }>`
  max-width: 500px;
  ${({ size }) => size ? `width: ${size}ex;`: ''}

  &, & * {
    box-sizing: border-box;
  }
`;
const activeLabelStyle = css`
  transform: translate(-1ex, -75%);
  font-size: ${({ theme }) => theme.fontSize.sm};
  background-color: ${({ theme }) => theme.colors.bg};
`;
const Label = styled.label.attrs<{ active: boolean }>({})<{ active: boolean }>`
  position: absolute;
  padding: 2px 4px;
  left: 1ex;
  transition: transform 0.2s ease-in-out;
  ${({ active }) => active ? activeLabelStyle : ''}

  &:empty {
    display: none;
  }
`;
const FakeInput = styled.div.attrs({})`
  position: relative;
  display: flex;
  align-items: center;
  outline: 1px solid ${({ theme }) => theme.colors.fg};
  font-size: ${({ theme }) => theme.fontSize.reg};

  &:not(:focus-within):hover {
    background-color: ${({ theme }) => theme.colors.accent};
    outline: 1px solid ${({ theme }) => theme.colors.info};
  }
  &:focus-within {
    outline: 2px solid ${({ theme }) => theme.colors.info};

    ${Label} {
      ${activeLabelStyle}
    }
  }
`;
const ValueOverlay = styled.div.attrs({})`
  position: relative;
  flex: 1;
`;
const Input = styled.input.attrs({
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
const DisplayValue = styled.div.attrs({})`
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
const OptionalIcon = styled.span.attrs({})`
  flex-basis: min-content;

  &:empty {
    display: none;
  }
`;
const StatusIcon = styled.span.attrs<{ open?: boolean }>({})<{ open?: boolean }>`
  flex-basis: min-content;
  display: flex;
  align-items: center;

  ${Caret} {
    rotate: ${({ open }) => open ? '90' : '-90'}deg;
    transition: rotate 0.2s ease-in-out;
  }
`;
const OptionalInfo = styled.div.attrs({})`
  display: flex;
  align-items: flex-start;
  font-size: ${({ theme }) => theme.fontSize.sm};
`;
const Message = styled.div.attrs({})`
  flex: 1;
`;
const Count = styled.div.attrs({})`
  white-space: nowrap;

  &:empty {
    display: none;
  }
`;
const Menu = styled.div.attrs({})`
  position: absolute;
  left: 0;
  right: 0;
  top: calc(100% + 4px);
  border: 1px solid;
  z-index: 100;
  background: ${({ theme }) => theme.colors.bg};
`;
type OptionItem = DropdownOption<any> & {
  active?: boolean,
  selected?: boolean,
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>,
  onClick?: React.MouseEventHandler<HTMLDivElement>
};
const ItemDisplay = styled.div.attrs<OptionItem>(({ active }) => ({
  className: (active ? 'active' : '') as string,
}))<OptionItem>`
  display: flex;
  padding: 0.125em 0.25em;

  &.active,
  &:hover {
    cursor: pointer;
    outline: 1px solid ${({ theme }) => theme.colors.info};
    color: ${({ theme }) => theme.colors.info};
  }
`;
const Item = ({ active, label, value, selected, ...rest }: OptionItem) => (
  <ItemDisplay {...{ active, label, value, ...rest }}>
    <ItemSelected>
      {selected && (<ThumbsUp />)}
    </ItemSelected>
    <ItemValue>{label || value}</ItemValue>
  </ItemDisplay>
);
const ItemSelected = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-basis: 1.5em;
  color: ${({ theme }) => theme.colors.info};
`;
const ItemValue = styled.div`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Tag = styled.span`
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

export default Dropdown;
