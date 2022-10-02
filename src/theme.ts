import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  fontSize: {
    reg: '16px',
    sm: '13px',
    lg: '24px',
  },
  colors: {
    fg: 'var(--fg, black)',
    bg: 'var(--bg, white)',
    accent: '#008bc5',
    highlight: '#ffd754',
    success: '#2dc937',
    warning: '#e7b416',
    danger: '#cc3232',
    info: '#5295cb',
  },
};
