import * as React from 'react';
import {
  Container, Label, FakeInput, ValueOverlay, Input} from '../Input/labelAndInput';
import {
  OptionalIcon, StatusIcon
} from '../Input/icons';
import {
  Message, OptionalInfo
} from '../Input/optionalBlocks';
import { Next as Caret } from '../../icons';
import { DropdownProps } from './types';
import { Menu, Item } from './menuAndOptions';
import { Tag, DisplayValue } from './valueDisplay';

const Dropdown = ({
  size, label, value, onChange, options, helperText, validationMessage, placeholder, icon,
  ...field
}: DropdownProps): JSX.Element => {
  const [open, setOpen] = React.useState(false);
  const [cursor, setCursor] = React.useState(-1);

  const hasValue = !!value?.length;
  const hasIcon = !!icon;
  const isInvalid = !!validationMessage;

  const selected = React.useMemo(() => {
    if (options?.length && value.length) {
      return options.find(({ value: id }) => value === id);
    }
    return undefined;
  }, [options, value]);
  const optionItems = React.useMemo(() => (
    options?.map((option, index) => (
      <Item key={option.value} {...option} index={index}
        selected={selected?.value === option.value}
        onMouseEnter={() => { setCursor(index); }}
        onClick={() => { onChange(option.value); setOpen(false); }}
      />
    ))
  ), [options, selected]);

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
      case 'ArrowDown':
        if (open) {
          setCursor(cursor => (
            Math.max(0,
              Math.min(options.length - 1,
                cursor + (key === 'ArrowUp' ? -1 : 1)
              )
            )
          ));
        } else {
          setOpen(true);
        }
        break;
      case 'Escape':
        if (open) {
          setOpen(false);
        } else {
          onChange('');
        }
        break;
    }
  }, [options, open, onChange, cursor]);

  const inputOptions = React.useMemo(() => ({
    ...field,
    value: '',
    readOnly: true,
    onChange: undefined,
    onClick (evt: React.MouseEvent<HTMLInputElement>) {
      field?.onClick?.(evt);
      setOpen(open => !open);
    },
    onKeyDown (evt: React.KeyboardEvent<HTMLInputElement>) {
      field?.onKeyDown?.(evt);
      handleCursor(evt);
    },
  }), [field, value, onChange]);

  return (
    <Container {...{ size }}>
      <FakeInput {...{ isInvalid }}>
        {(label || placeholder) && (
          <Label active={hasValue} {...{ hasIcon }}>
            {hasValue ? label : label || placeholder}
          </Label>
        )}
        <OptionalIcon>{icon}</OptionalIcon>
        <ValueOverlay>
          <Input {...inputOptions} />
          {!!selected && (
            <DisplayValue>
              <Tag key={selected.value}>{selected.label || selected.value}</Tag>
            </DisplayValue>
          )}
        </ValueOverlay>
        <StatusIcon {...{ open }} onClick={() => { setOpen(open => !open); }} >
          <Caret />
        </StatusIcon>
        {open && <Menu {...{ cursor }}>
          {optionItems}
        </Menu>}
      </FakeInput>
      <OptionalInfo {...{ isInvalid }}>
        <Message>{validationMessage || helperText}</Message>
      </OptionalInfo>
    </Container>
  );
};

export default Dropdown;
