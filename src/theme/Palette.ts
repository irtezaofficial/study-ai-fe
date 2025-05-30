import {Palette} from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    custom: {
      searchBar: string;
      errorFilter: string;
      dark: string;
      placeholder: string;
      main: string;
      appGradient: string;
      font1: string;
      font2: string;
      bgInput: string;
      background: string;
      boxShadow: string;
      mainHover: string;
    };
    chip: {
      accepted: string;
      acceptedText: string;
      expired: string;
      expiredText: string;
      pending: string;
      pendingText: string;
      invited: string;
      invitedText: string;
    };
  }

  interface PaletteOptions {
    custom?: {
      searchBar: string;
      errorFilter: string;
      dark: string;
      placeholder: string;
      main: string;
      appGradient: string;
      font1: string;
      font2: string;
      bgInput: string;
      background: string;
      boxShadow: string;
      mainHover: string;
    };
    chip?: {
      accepted: string;
      acceptedText: string;
      expired: string;
      expiredText: string;
      pending: string;
      pendingText: string;
      invited: string;
      invitedText: string;
    };
  }
}

export default {
  primary: {
    main: '#024780',
    contrastText: '#444444',
    light: '#F2F2F2',
    dark: '#444444',
  },
  secondary: {
    main: '#E9E5DF',
    light: '#EEEEEEEE',
    contrastText: '#666666',
  },
  chip: {
    accepted: '#CCFBF1',
    acceptedText: '#115E59',
    expired: '#FEE2E2',
    expiredText: '#991B1B',
    pending: '#FEF9C3',
    pendingText: '#854D0E',
    invited: '#F0F8FF',
    invitedText: '#0066B0',
  },
  text: {
    primary: '#0a3d62',
    secondary: '#666666',
  },
  custom: {
    searchBar: '#f0f0f0',
    dark: '#444444',
    placeholder: '#BABABA',
    main: '#019FE2',
    errorFilter:
      'invert(14%) sepia(78%) saturate(6511%) hue-rotate(0deg) brightness(100%) contrast(118%)',
    appGradient: 'linear-gradient(322.69deg, #024780 -0.67%, #019FE2 99.11%)',
    font1: '#333333',
    font2: '#1E1E1E',
    bgInput: '#FAFAFA',
    background: '#FFFFFF',
    boxShadow: '#0000000F',
    mainHover: '#024780CC',
  },
  common: {
    white: '#FFFFFF',
    black: '#000000',
  },
  mode: 'light',
  success: {
    main: '#0B8235',
  },
  error: {
    main: '#ff0000',
  },
} as Palette;
