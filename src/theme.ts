import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  // todo maybe consolidate all the fonts under one?
  fonts: {
    abel: 'Abel',
    firaCode: 'Fira Code',
    firaSans: 'Fira Sans',
    notoSerif: 'Noto Serif',
    novaMono: 'Nova Mono',
    roboto: 'Roboto',
    workSans: 'Work Sans',
  },
  fontSize: {
    xs: '8px',
    sm: '12px',
    reg: '16px',
    lg: '24px',
    xl: '32px',
  },
  fontWeight: {
    light: '300',
    normal: '400',
    bold: '700',
  },
  colors: {
    fg: 'var(--fg, black)',
    bg: 'var(--bg, white)',
    // Primary: links, etc
    accent: '#008bc5',
    darkAccent: '',
    // Secondary: matching search results, etc
    highlight: '#ffd754',
    //
    loadingScreen: '',

    alert: {
      info: '#5295cb',
      success: '#2dc937',
      warning: '#e7b416',
      danger: '#cc3232',
    },
    rainbow1: {
      purple: '#6c3fa6',
      fushia: '#bd3db0',
      magenta: '#fd4982',
      orange: '#ff7142',
      darkgold: '#e2b52c',
      lime: '#b0ee58',
      green: '#51f661',
      springGreen: '#1edca0',
      lapis: '#23add7',
      cobalt: '#4c70dc',
      lightPurple: '#aa74f1'
    },
    rainbow2: {
      magentaCrayola: '#e65aae',
      maroon: '#a34162',
      brickRed: '#d1495b',
      tangerine: '#e67c0a',
      sunray: '#edae49',
      blueMunsell: '#008da3',
      bedazzledBlue: '#3a5c9b',
      asparagus: '#729b51',
    },
    rainbow3: {
      frenchFuchsia: '#fc368f',
      cinnabar: '#ee3c2f',
      outrageousOrange: '#ff6c47',
      rajah: '#ffb561',
      corn: '#ffea62',
      springGreen: '#61ff81',
      darkTurquoise: '#30d6d9',
      blueGray: '#5295cb',
      mediumOrchid: '#c25bd7',
    },
    yellows: {
      goldenAura: '#d29e69',
      wakeUp: '#ffd754',
    },
    reds: {
      smokinHot: '#954a3e',
      kabuki: '#a43b3e',
      raptureRed: '#a9333d',
      candyApple: '#b1333f',
      poinsettiaRed: '#c33e49',
    },
    purples: {
      deepPlum: '#6a3d58',
      brightBlackRaspberry: '#883e67',
      hushedCranberry: '#9b587e',
      antiqueFuchia: '#b16590',
      pinkZinniaBloom: '#cb80a8',
    },
    blues: {
      darkCobaltBlue: '#33578a',
      blueEdge: '#035e7c',
      superiorBlue: '#3a5e73',
      amalfi: '#016e85',
      splendorAndPride: '#5770a5',
      celebrationBlue: '#008bc5',
      heroBlue: '#1898c8',
      manitouBlue: '#5b92a2',
      overboard: '#41a4cd',
    },
    greens: {
      blackEvergreen: '#44524f',
      hummingbirdGreen: '#5b714b',
      homegrownHerbs: '#5e8548',
    },
    grays: {
      eerieBlack: '#131313',
      jet: '#333333',
      onyx: '#3b3c3c',
      davysGrey: '#535454',
      dimGray: '#6c6c6c',
      battleshipGrey: '#848484',
      spanishGray: '#9c9d9d',
      silverChalice: '#b5b5b5', // #acacac
      lightGray: '#cdcdcd', // #cccccc
      gainsboro: '#dddddd',
      platinum: '#e5e5e5',
    },
    hulk: {
      skobeloff: '#006466',
      midnightGreen: '#065a60',
      midnightGreen2: '#0b525b',
      midnightGreen3: '#144552',
      charcoal: '#1b3a4b',
      prussianBlue: '#212f45',
      spaceCadet: '#272640',
      darkPurple: '#312244',
      darkPurple2: '#3e1f47',
      palatinatePurple: '#4d194d',
    }
  },
};
