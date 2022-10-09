import * as React from 'react';
import { ComponentMeta } from '@storybook/react';
import { SamplePage } from '../../shared/storybook.utils';
import Component from '.';
import { DropdownOption, DropdownProps } from './types';
import { Reddit } from '../../icons';

export default {
  title: 'Interactive/Dropdown',
  component: Component,
  decorators: [SamplePage],
  argTypes: {
    label: {
      description: 'the label for the input',
    },
    size: {
      control: { type: 'number', min: 12, max: 120, step: 4 },
      description: 'width in number of characters'
    },
    icon: {
      control: { type:'select', options: ['none', 'reddit'] },
      description: 'the icon for the left side of the input',
    }
  },
} as ComponentMeta<typeof Component>;

const options: DropdownOption<string>[] = [
  { label: 'One', value: 'one' },
  { label: 'Two', value: 'two' },
  { label: 'Three', value: 'three' },
  { label: 'Four', value: 'four' },
  { label: 'Five', value: 'five' },
];
export const Dropdown = ({ label, placeholder, size, icon }) => {
  const [value, onChange] = React.useState('');

  const validationMessage = React.useMemo(() => (
    (value === 'three') ? 'You have exceeded the allowable selection' : ''
  ), [value]);

  return (
    <Component {...{
      value, placeholder,
      label, validationMessage, size,
      icon: /reddit/i.test(icon) ? <Reddit /> : null,
      onChange(selected) {
        onChange(selected);
      },
      options
    } as DropdownProps<string>} />
  );
};

Dropdown.args = {
  label: 'Dropdown',
  placeholder: 'placeholder',
  size: 20,
  icon: null,
}