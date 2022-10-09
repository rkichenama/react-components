import * as React from 'react';
import { ComponentMeta } from '@storybook/react';
import { SamplePage } from '../../shared/storybook.utils';
import Component from '.';
import { Reddit } from '../../icons';

export default {
  title: 'Interactive/Input',
  component: Component,
  decorators: [SamplePage],
  argTypes: {
    label: {
      description: 'the label for the input',
    },
    size: {
      control: {
        type: 'number', min: 12, max: 120, step: 4,
      },
      description: 'width in number of characters',
    },
    maxCharacters: {
      control: {
        type: 'number', min: 0, max: 40, step: 2,
      },
      description: 'non-zero number of max characters allowed',
    },
    icon: {
      control: { type: 'select', options: ['none', 'reddit'] },
      description: 'the icon for the left side of the input',
    },
  },
} as ComponentMeta<typeof Component>;

export function Input({
  label, placeholder, maxCharacters, size, icon,
}) {
  const [value, onChange] = React.useState('');
  const validationMessage = React.useMemo(() => (
    !!maxCharacters && (value.length > maxCharacters) ? 'You have exceeded the character allotment' : ''
  ), [maxCharacters, value]);

  return (
    <Component {...{
      value,
      onChange,
      label,
      placeholder,
      maxCharacters,
      validationMessage,
      size,
      icon: /reddit/i.test(icon) ? <Reddit /> : null,
    }}
    />
  );
}

Input.args = {
  label: 'Input',
  placeholder: 'placeholder',
  maxCharacters: 0,
  size: 20,
  icon: null,
};
