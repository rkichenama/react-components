import * as React from 'react';
import { ComponentMeta } from '@storybook/react';
import { SamplePage } from '../shared/storybook.utils';
import Input from '.';
import { Reddit } from '../icons';

export default {
  title: 'Input',
  component: Input,
  decorators: [SamplePage],
  argTypes: {
    label: {
      description: 'the label for the input',
    },
    size: {
      control: { type: 'number', min: 12, max: 120, step: 4 },
      description: 'width in number of characters'
    },
    maxCharacters: {
      control: { type: 'number', min: 0, max: 40, step: 2 },
      description: 'non-zero number of max characters allowed'
    },
    icon: {
      control: { type:'select', options: ['none', 'reddit'] },
      description: 'the icon for the left side of the input',
    }
  },
} as ComponentMeta<typeof Input>

export const Example = ({ label, maxCharacters, size, icon }) => {
  const [value, onChange] = React.useState('');
  const validationMessage = React.useMemo(() => (
    !!maxCharacters && (value.length > maxCharacters) ? 'You have exceeded the character allotment' : ''
  ), [maxCharacters, value]);

  return (
    <Input {...{
      value, onChange, label, maxCharacters, validationMessage, size, icon: /reddit/i.test(icon) ? <Reddit /> : null
    }} />
  );
};

Example.args = {
  label: 'Input Label',
  placeholder: 'placeholder',
  maxCharacters: 0,
  size: 20,
  icon: null,
}