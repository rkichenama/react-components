import { DefaultTheme } from 'styled-components';

const cutBorder = `
& {
  // --background: black;
  // --border-color: linear-gradient(to bottom right, red, purple, blue);
  // --border-width: 2px;
  // --edge-size: 0.75rem;

  isolation: isolate;
  position: relative;
  padding: calc(var(--border-width) * 2) var(--edge-size);
  border: 0;

  &::before, &::after {
    content: '';
    inset: 0;
    position: absolute;
  }

  &::before {
    background: var(--border-color);
    z-index: -2;
    clip-path: polygon(
      /* top left */
      var(--edge-size) 0%,
      /* top right */
      calc(100% - var(--edge-size)) 0%,

      /* right center */
      100% 50%,

      /* right bottom */
      calc(100% - var(--edge-size)) 100%,
      /* left bottom */
      var(--edge-size) 100%,

      /* left center */
      0% 50%
    );
  }

  &::after {
    --insetY: calc(var(--border-width) * 0.7071067811865476);
    --insetX: calc(var(--border-width) * 0.49999999999999994);
    background: var(--background);
    z-index: -1;
    clip-path: polygon(
      /* top left */
      calc(var(--edge-size) + var(--insetX)) var(--insetY),
      /* top right */
      calc(100% - var(--edge-size) - var(--insetX)) var(--insetY),

      /* right center */
      calc(100% - var(--border-width)) 50%,

      /* right bottom */
      calc(100% - var(--edge-size) - var(--insetX)) calc(100% - var(--insetY)),
      /* left bottom */
      calc(var(--edge-size) + var(--insetX)) calc(100% - var(--insetY)),

      /* left center */
      var(--border-width) 50%
    );
  }
}
`;
export const theme: DefaultTheme = {
  cutBorder,
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
    fg: '#ffffff',
    bg: '#000000',
    // Primary: links, etc
    accent: '#00b2ff',
    darkAccent: '#008bc5',
    // Secondary: matching search results, etc
    highlight: '#ffd754',
    //
    loadingScreen: 'rgba(0,0,0,0.8)',

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
    reds: {
      smokinHot: '#954a3e',
      kabuki: '#a43b3e',
      raptureRed: '#a9333d',
      candyApple: '#b1333f',
      poinsettiaRed: '#c33e49',
    },
    yellows: {
      goldenAura: '#d29e69',
      wakeUp: '#ffd754',
    },
    greens: {
      blackEvergreen: '#44524f',
      hummingbirdGreen: '#5b714b',
      homegrownHerbs: '#5e8548',
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
    purples: {
      deepPlum: '#6a3d58',
      brightBlackRaspberry: '#883e67',
      hushedCranberry: '#9b587e',
      antiqueFuchia: '#b16590',
      pinkZinniaBloom: '#cb80a8',
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
  layers: {
    underneath: -12,
    below: -1,
    above: +1,
    overlay: 40,
    dropdown: 50,
    topMost: 100,
    popover: 900, //modal w/o background
    toast: 925,
    loading: 950, //app level
    modal: 1000,
  },
  textShadow: `calc(var(--stroke-width, 1px) * 1) calc(var(--stroke-width, 1px) * 0) 0 var(--stroke-color, #000000),
  calc(var(--stroke-width, 1px) * 0.9239) calc(var(--stroke-width, 1px) * 0.3827) 0 var(--stroke-color, #000000),
  calc(var(--stroke-width, 1px) * 0.7071) calc(var(--stroke-width, 1px) * 0.7071) 0 var(--stroke-color, #000000),
  calc(var(--stroke-width, 1px) * 0.3827) calc(var(--stroke-width, 1px) * 0.9239) 0 var(--stroke-color, #000000),
  calc(var(--stroke-width, 1px) * 0) calc(var(--stroke-width, 1px) * 1) 0 var(--stroke-color, #000000),
  calc(var(--stroke-width, 1px) * -0.3827) calc(var(--stroke-width, 1px) * 0.9239) 0 var(--stroke-color, #000000),
  calc(var(--stroke-width, 1px) * -0.7071) calc(var(--stroke-width, 1px) * 0.7071) 0 var(--stroke-color, #000000),
  calc(var(--stroke-width, 1px) * -0.9239) calc(var(--stroke-width, 1px) * 0.3827) 0 var(--stroke-color, #000000),
  calc(var(--stroke-width, 1px) * -1) calc(var(--stroke-width, 1px) * 0) 0 var(--stroke-color, #000000),
  calc(var(--stroke-width, 1px) * -0.9239) calc(var(--stroke-width, 1px) * -0.3827) 0 var(--stroke-color, #000000),
  calc(var(--stroke-width, 1px) * -0.7071) calc(var(--stroke-width, 1px) * -0.7071) 0 var(--stroke-color, #000000),
  calc(var(--stroke-width, 1px) * -0.3827) calc(var(--stroke-width, 1px) * -0.9239) 0 var(--stroke-color, #000000),
  calc(var(--stroke-width, 1px) * 0) calc(var(--stroke-width, 1px) * -1) 0 var(--stroke-color, #000000),
  calc(var(--stroke-width, 1px) * 0.3827) calc(var(--stroke-width, 1px) * -0.9239) 0 var(--stroke-color, #000000),
  calc(var(--stroke-width, 1px) * 0.7071) calc(var(--stroke-width, 1px) * -0.7071) 0 var(--stroke-color, #000000),
  calc(var(--stroke-width, 1px) * 0.9239) calc(var(--stroke-width, 1px) * -0.3827) 0 var(--stroke-color, #000000)`,
};
