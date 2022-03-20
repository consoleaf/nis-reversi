import { Styles } from '@chakra-ui/theme-tools';

export const styles: Styles = {
  global: (props) => ({
    html: {
      height: '100vh',
      width: '100vw',
      margin: 0,
      padding: 0,
    },
    body: {
      height: 'full',
      width: 'full',
      margin: 0,
      padding: 0,
    },
    '#root': {
      height: 'full',
      width: 'full',
    },
    '*::-webkit-scrollbar': {
      width: '6px',
      height: '6px',
    },

    '::-webkit-scrollbar-thumb': {
      background: '#aaaaaa',
      borderRadius: '3px',
      transition: 'all 200ms linear',
    },

    '*::-webkit-scrollbar-thumb:hover': {
      background: 'teal',
    },

    '*::-webkit-scrollbar-track': {
      background: 'transparent',
    },

    '.custom-scrollbar': {
      overflowY: 'auto',
    },

    '.custom-scrollbar::-webkit-scrollbar': {
      width: '10px',
      height: '10px',
    },
    '.custom-scrollbar::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
      borderRadius: '10px',
    },
    '.custom-scrollbar::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      borderRadius: '10px',
    },
  }),
};
