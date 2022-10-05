import * as React from 'react';
import { ComponentMeta } from '@storybook/react';
import { SamplePage } from '../shared/storybook.utils';
import Dropdown from '.';
import { Reddit } from '../icons';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Interactive/Dropdown',
  component: Dropdown,
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
} as ComponentMeta<typeof Dropdown>;

const options = [
  { label: 'One', value: 'one' },
  { label: 'Two', value: 'two' },
  { label: 'Three', value: 'three' },
  { label: 'Four', value: 'four' },
  { label: 'Five', value: 'five' },
];
export const Example = ({ label, placeholder, size, icon }) => {
  const [value, onChange] = React.useState('');

  const validationMessage = React.useMemo(() => (
    (value === 'three') ? 'You have exceeded the allowable selection' : ''
  ), [value]);

  return (
    <Dropdown {...{
      value, placeholder,
      label, validationMessage, size,
      icon: /reddit/i.test(icon) ? <Reddit /> : null,
      onChange(selected) {
        onChange(selected);
      },
      options
    }} />
  );
};

Example.args = {
  label: 'Input Label',
  placeholder: 'placeholder',
  size: 20,
  icon: null,
}