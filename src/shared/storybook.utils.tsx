import * as React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { theme } from '../theme';

export function SamplePage(Story: React.FC<any>) {
  return (
    <>
      <Themed />
      <Article>
        <Story />
      </Article>
    </>
  );
}

const Themed = createGlobalStyle`
  html,
  html > body,
  html > body[class] {
    background-color: ${(theme as any).colors.grays.eerieBlack} !important;
    color: ${(theme as any).colors.fg} !important;
  }
`;
const Article = styled.article.attrs({
  className: 'sample-page',
})`
  min-width: 192px;
  background-color: ${({ theme }) => theme.colors.bg};
  padding: 0.5ch;
`;
