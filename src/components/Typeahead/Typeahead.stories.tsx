import * as React from 'react';
import { ComponentMeta } from '@storybook/react';
import { SamplePage } from '../../shared/storybook.utils';
import Component from '.';
import { Reddit } from '../../icons';

export default {
  title: 'Interactive/Typeahead',
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

const options = [
  { value: 'Option 1 dark' },
  { value: 'Option 2 knight' },
  { value: 'Option 3 rises' },
  { value: 'Option 4 at' },
  { value: 'Option 5 dawn' },
];

export const Typeahead = ({ label, placeholder, size, icon }) => {
  const [value, onChange] = React.useState('');
  const [selection, setSelection] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);

  const validationMessage = React.useMemo(() => (
    (selection?.includes('3')) ? 'You have exceeded the allowable selection' : ''
  ), [selection]);
  const filteredOptions = React.useMemo(() => (
    value
      ? options.filter((o) => o.value.toLowerCase().includes(value.toLowerCase()))
      : options
  ), [value, options]);

  React.useEffect(() => {
    setLoading(true);
    const timeout = window.setTimeout(() => {
      setLoading(false);
    }, 1250);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [value]);

  React.useEffect(() => {
    onChange('');
  }, [selection]);

  return (
    <Component {...{
      value, placeholder,
      label, validationMessage, size,
      icon: /reddit/i.test(icon) ? <Reddit /> : null,
      onChange,
      options: filteredOptions,
      isLoading,
      selection,
      onSelectionChange: (selected) => {
        setSelection(selected as string);
      }
    }} />
  );
};

Typeahead.args = {
  label: 'Typeahead',
  placeholder: 'placeholder',
  size: 20,
  icon: null,
};