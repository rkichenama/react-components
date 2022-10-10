import * as React from 'react';
import { Close } from '../../icons';
import {
  Container, FakeInput, Label, ValueOverlay, Input,
} from './labelAndInput';
import { OptionalIcon, StatusIcon } from './icons';
import { InputProps } from './types';
import { OptionalInfo, Message, Count } from './optionalBlocks';

const TextInput = ({
  size, label, value,
  onChange, helperText, validationMessage,
  maxCharacters, placeholder, icon,
  ...field
}: InputProps): JSX.Element => {
  const actualInput = React.useRef(undefined as unknown as HTMLInputElement);

  const hasValue = !!value?.length;
  const hasIcon = !!icon;
  const isInvalid = !!validationMessage;

  const inputOptions = React.useMemo(() => ({
    ...field,
    value,
    onChange(evt: React.ChangeEvent<HTMLInputElement>) {
      // when there are no options, return the typed in value
      onChange?.(evt.target.value as string);
    },
    // onFocus () {},
    // onBlur () {},
  }), [field, value, onChange]);
  const clearAction = React.useCallback(() => {
    onChange?.('');
    if (actualInput.current) {
      actualInput.current.focus();
    }
  }, [onChange]);

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
          <Input {...inputOptions} ref={actualInput} />
        </ValueOverlay>
        <StatusIcon onClick={clearAction}>
          {hasValue && <Close />}
        </StatusIcon>
      </FakeInput>
      <OptionalInfo {...{ isInvalid }}>
        <Message>{validationMessage || helperText}</Message>
        <Count>
          {
            !!maxCharacters && (
              <>
                {value.length}
                {' '}
                /
                {maxCharacters}
              </>
            )
          }
        </Count>
      </OptionalInfo>
    </Container>
  );
};

export default TextInput;
