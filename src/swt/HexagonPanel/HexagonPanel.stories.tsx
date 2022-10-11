import * as React from 'react';
import styled from 'styled-components';
import { ComponentMeta } from '@storybook/react';
// import { SamplePage } from '../../shared/storybook.utils';
import Component, { OuterPane } from '.';

export default {
  title: 'SWT/HexagonPanel',
  component: Component,
  // decorators: [SamplePage],
  argTypes: {
  },
} as ComponentMeta<typeof Component>;

export const HexagonPanel = ({
  copy, image, width, height,
}: any) => (
  <Component {...{
    copy, image, width, height,
  }}
  />
);

HexagonPanel.args = {
  copy: '',
  image: '',
  width: 0,
  height: 0,
};

export const Basemax = () => (
  <Grid>
    <Component
      image={`https://thispersondoesnotexist.com/image?${Math.random()}`}
      copy='center'
      style={{ gridArea: '1 / 3 / 5 / 6', backgroundColor: 'darkcyan' }}
    />
    <Component
      image={`https://thispersondoesnotexist.com/image?${Math.random()}`}
      copy='left'
      style={{ gridArea: '2 / 1 / 4 / 1', backgroundColor: 'slategray' }}
    />
    <Component
      image={`https://thispersondoesnotexist.com/image?${Math.random()}`}
      copy='top left'
      style={{ gridArea: '2 / 2 / 2 / 3', backgroundColor: 'magenta' }}
    />
    <Component
      image={`https://thispersondoesnotexist.com/image?${Math.random()}`}
      copy='bottom left'
      style={{ gridArea: '3 / 2 / 3 / 3', backgroundColor: 'orange' }}
    />
    <Component
      image={`https://thispersondoesnotexist.com/image?${Math.random()}`}
      copy='bottom right'
      style={{ gridArea: '3 / 6 / 3 / 7', backgroundColor: 'orange' }}
    />
    <Component
      image={`https://thispersondoesnotexist.com/image?${Math.random()}`}
      copy='top right'
      style={{ gridArea: '2 / 6 / 2 / 7', backgroundColor: 'magenta' }}
    />
    <Component
      image={`https://thispersondoesnotexist.com/image?${Math.random()}`}
      copy='right'
      style={{ gridArea: '2 / 7 / 4 / 8', backgroundColor: 'slategray' }}
    />
  </Grid>
);

const Grid = styled.div`
  display: inline-grid;
  grid-auto-flow: dense;
  grid-template-columns: repeat(8, 5ic);
  grid-auto-rows: 5ic;
  align-items: center;
  row-gap: 0.75ic;
  margin: -4ic auto;

  ${OuterPane} {
    margin: -0.75ic;
  }
`;
