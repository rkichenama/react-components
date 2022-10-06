import * as React from 'react';
import { ComponentMeta } from '@storybook/react';
import { SamplePage } from '../../shared/storybook.utils';
import Typeahead from '.';
import { Reddit } from '../../icons';

export default {
  title: 'Interactive/Typeahead',
  component: Typeahead,
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
} as ComponentMeta<typeof Typeahead>;

const options = [
  { label: 'One', value: 1 },
  { label: 'Two', value: 2 },
  { label: 'Three', value: 3 },
  { label: 'Four', value: 4 },
  { label: 'Five', value: 5 },
];

export const Example = ({ label, placeholder, size, icon }) => {
  const [value, onChange] = React.useState('');
  const [selection, setSelection] = React.useState(-1);
  const [isLoading, setLoading] = React.useState(false);

  const validationMessage = React.useMemo(() => (
    (selection === 3) ? 'You have exceeded the allowable selection' : ''
  ), [selection]);

  React.useEffect(() => {
    setLoading(true);
    const timeout = window.setTimeout(() => {
      setLoading(false);
    }, 250);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [value]);

  React.useEffect(() => {
    onChange('');
  }, [selection]);

  return (
    <Typeahead {...{
      value, placeholder,
      label, validationMessage, size,
      icon: /reddit/i.test(icon) ? <Reddit /> : null,
      onChange, options,
      isLoading,
      selection: selection === -1 ? undefined : selection,
      onSelectionChange: (selected) => {
        setSelection(Number(selected ?? -1));
      }
    }} />
  );
};

Example.args = {
  label: 'Input Label',
  placeholder: 'placeholder',
  size: 20,
  icon: null,
};