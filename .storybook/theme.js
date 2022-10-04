import { create } from '@storybook/theming';
// import { themes } from '@storybook/theming';

export default create({
  base: 'dark',

  colorPrimary: '#00ffff', // coral
  colorSecondary: '#138888', // ocean

  // UI
  appBg: '#000000',
  appContentBg: '#131313',
  appBorderColor: '#333333',
  // appBorderRadius: 4,

  // Typography
  // fontBase: '"Open Sans", sans-serif',
  // fontCode: 'monospace',

  // Text colors
  // textColor: 'black',
  // textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  barTextColor: '#cccccc',
  // barSelectedColor: '#131313',
  barBg: '#000000',

  // Form colors
  // inputBg: 'white',
  // inputBorder: 'silver',
  // inputTextColor: 'black',
  // inputBorderRadius: 4,

  brandTitle: `Richard's Component Storybook`,
  brandUrl: 'https://rkichenama.github.io/',
  brandImage: 'https://fakeimg.pl/180x75/000000,0/ffffff/?text=Components',
  brandTarget: '_self',
});
