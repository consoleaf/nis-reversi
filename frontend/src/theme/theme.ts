import {
  theme as baseTheme,
  extendTheme,
  withDefaultColorScheme,
} from '@chakra-ui/react';
import { colors } from './colors';
import { styles } from './styles';

export const theme = extendTheme(
  {
    colors,
    styles,
    config: {
      initialColorMode: window.localStorage.getItem('theme') ?? 'light',
    },
  },
  withDefaultColorScheme({
    colorScheme: 'green',
  }),
  baseTheme
);
