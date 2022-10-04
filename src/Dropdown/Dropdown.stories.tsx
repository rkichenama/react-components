import * as React from 'react';
import { SamplePage } from '../shared/storybook.utils';
import Dropdown from '.';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Interactive/Dropdown',
  component: Dropdown,
  decorators: [SamplePage],
  argTypes: {
    size: {
      control: { type: 'number', min: 12, max: 120, step: 4 }
    },
    maxCharacters: {
      control: { type: 'number', min: 0, max: 40, step: 2 }
    },
  },
};

export const Example = () => {
  const [value, onChange] = React.useState([] as string[]);

  React.useEffect(() => {
    console.log({value})
  }, [value]);
  return (
    <Dropdown {...{
      value, onChange(selected) {
        onChange(current => {
          if (current.includes(selected)) {
            return current.filter(value => value !== selected);
          } else {
            return [ ...current, selected ];
          }
        });
      },
      placeholder: 'select from below', options: [
        { label: 'One', value: 'one' },
        { label: 'Two', value: 'two' },
        { label: 'Three', value: 'three' },
        { label: 'Four', value: 'four' },
        { label: 'Five', value: 'five' },
      ]
    }} />
  );
};
