import * as React from 'react';
import styled from 'styled-components';
import { ComponentMeta } from '@storybook/react';
import { SamplePage } from '../../shared/storybook.utils';
import Component from '.';
import { TruncateProps } from './types';

export default {
  title: 'Display/Truncate',
  component: Component,
  decorators: [SamplePage],
  argTypes: {
    text: {
      description: 'string to truncate',
    },
    seperator: {
      control: { type: 'select', options: ['none', '|=|'] },
      description: 'string to use as replacement for truncated text',
    },
    divWidth: {
      control: {
        type: 'number', min: 32, max: 400, step: 16,
      },
      description: 'demo width for the container div',
    },
  },
} as ComponentMeta<typeof Component>;

export const Truncate = ({ text, seperator, divWidth }: TruncateProps & { divWidth: number }) => (
  <Component {...{ text,
    seperator: seperator !== 'none' ? seperator : undefined,
    style: { maxWidth: `${divWidth}px` } }}
  />
);

Truncate.args = {
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
  seperator: 'none',
  divWidth: 96,
};

export const TruncatedBreadcrumb = ({
  text, seperator, divWidth, style = {},
}: any) => (
  <>
    {
      Array.from({ length: 5 }).map((_, i) => (
        <React.Fragment key={i}>
          {(i > 0) && ' / '}
          <FakeLink>
            <Component {...{ text,
              seperator: seperator !== 'none' ? seperator : undefined,
              style: { maxWidth: `${divWidth}px`, ...style } }}
            />
          </FakeLink>
        </React.Fragment>
      ))
    }
  </>
);

const FakeLink = styled.a.attrs({
  href: '#',
  onClick() { /* */ },
})`
  &, &:link, &:visited {
    color: ${({ theme }) => theme.colors.darkAccent};
  }

  &:active, &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

TruncatedBreadcrumb.args = {
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
  seperator: 'none',
  divWidth: 96,
};
