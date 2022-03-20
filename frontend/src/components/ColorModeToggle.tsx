import { useEffect } from 'react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { IconButton, Tooltip, useColorMode } from '@chakra-ui/react';

export const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    localStorage.setItem('theme', colorMode);
  }, [colorMode]);

  return (
    <Tooltip label="Toggle light/dark mode">
      <IconButton
        aria-label="Toggle light/dark mode"
        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
        variant="ghost"
      />
    </Tooltip>
  );
};
