import * as React from 'react';
import styled from 'styled-components';

export const SamplePage = (Story: React.FC<any>) => (
  <Article>
    <Story />
  </Article>
);

const Article = styled.article.attrs({
  className: 'sample-page'
})`
  min-width: 192px;
  background-color: white;
  padding: 0.5ch;
`;