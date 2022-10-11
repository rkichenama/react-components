// import { themes } from '@storybook/theming';
import { ThemeProvider } from 'styled-components';
import { addDecorator } from '@storybook/react';
import { withThemes } from '@react-theming/storybook-addon';
import { theme } from '../src/theme';
import previewTheme from './theme';
// import { withPropsTable } from 'storybook-addon-react-docgen';

import './googleIcons.css';
import './googleFonts.css';
import './styles.css';

addDecorator(withThemes(ThemeProvider, [theme]));
// addDecorator(withPropsTable);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  // layout: 'centered',
  docs: {
    // theme: themes.dark,
    theme: previewTheme,
  },
  options: {
    storySort: {
      method: 'alphabetical',
    },
  },
}