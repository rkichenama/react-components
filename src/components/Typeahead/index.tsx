import * as React from 'react';
import styled from 'styled-components';
import {
  Container, Label, FakeInput, ValueOverlay, Input,
} from '../Input/labelAndInput';
import {
  OptionalIcon, StatusIcon,
} from '../Input/icons';
import {
  Message, OptionalInfo,
} from '../Input/optionalBlocks';
import { Next as Caret } from '../../icons';
import { TypeaheadProps } from './types';
import { Menu, Item, ItemDisplay } from '../Dropdown/menuAndOptions';
import { Tag, DisplayValue } from '../Dropdown/valueDisplay';
import { Spinner } from '../Spinner';

const Typeahead = ({
  options, value, selection, icon, label, placeholder,
  helperText, validationMessage,
  size, isLoading,
  onChange, onSelectionChange, ...field
}: TypeaheadProps<number | string>) => {
  const [open, setOpen] = React.useState(false);
  const [cursor, setCursor] = React.useState(-1);

  const hasValue = !!value?.length || !!selection;
  const hasIcon = !!icon;
  const isInvalid = !!validationMessage;

  const selected = React.useMemo(() => {
    if (options?.length && !!selection) {
      return options.find(({ value: id }) => selection === id);
    }
    return undefined;
  }, [options, selection]);
  const optionItems = React.useMemo(() => (
    isLoading
      ? <CenteredSpinner />
      : !options.length
        ? <ZeroState />
        : options.map((option, index) => (
          <Item
            key={option.value}
            {...option}
            index={index}
            selected={selection === option.value}
            onMouseEnter={() => { setCursor(index); }}
            onClick={() => { onSelectionChange?.(option.value); setOpen(false); }}
          />
        ))
  ), [isLoading, options, selection, onSelectionChange]);

  const handleCursor = React.useCallback(({ key }: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open) {
      if (['Enter', 'ArrowDown', 'ArrowUp'].includes(key)) {
        setOpen(true);
      }
      if (key === 'Escape') {
        onSelectionChange?.(undefined);
      }
    } else {
      if (['Enter', 'Escape'].includes(key)) {
        if (key === 'Enter') {
          onSelectionChange?.(options[cursor].value);
        }
        setOpen(false);
      }
      if (['ArrowUp', 'ArrowDown'].includes(key)) {
        setCursor((cursor) => (
          Math.max(
            0,
            Math.min(
              options.length - 1,
              cursor + (key === 'ArrowUp' ? -1 : 1),
            ),
          )
        ));
      }
    }
  }, [open, onSelectionChange, options, cursor]);

  const inputOptions = React.useMemo(() => ({
    ...field,
    value,
    onChange({ target }: React.ChangeEvent<HTMLInputElement>) {
      onChange?.(target.value);
    },
    onClick(evt: React.MouseEvent<HTMLInputElement>) {
      field?.onClick?.(evt);
      setOpen((open) => !open);
    },
    onKeyDown(evt: React.KeyboardEvent<HTMLInputElement>) {
      field?.onKeyDown?.(evt);
      handleCursor(evt);
    },
  }), [field, value, onChange, handleCursor]);

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
          {!value && !!selected && (
            <DisplayValue>
              <Tag>{selected.label || selected.value || null}</Tag>
            </DisplayValue>
          )}
        </ValueOverlay>
        <StatusIcon {...{ open }} onClick={() => { setOpen((open) => !open); }}>
          <Caret />
        </StatusIcon>
        {open && (
          <Menu {...{ cursor }}>
            {optionItems}
          </Menu>
        )}
      </FakeInput>
      <OptionalInfo {...{ isInvalid }}>
        <Message>{validationMessage || helperText}</Message>
      </OptionalInfo>
    </Container>
  );
};

const CenteredSpinner = styled.div.attrs({
  children: (<Spinner />),
})`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 60px;
`;
const ZeroState = styled(ItemDisplay).attrs({
  children: 'There are no options matching input',
  label: undefined,
  value: undefined,
})``;

export default Typeahead;
