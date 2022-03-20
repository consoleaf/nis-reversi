import { Suspense, useEffect } from 'react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import {
  Box,
  chakra,
  IconButton,
  Spacer,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { useResetGame } from '@reversi/util/state';
import { Link, Outlet, useMatch, useLocation } from 'react-router-dom';
import { ColorModeToggle } from './ColorModeToggle';
import { Loading } from './Loading';

const PageComp = chakra(Box, {
  baseStyle: {
    height: 'full',
    width: 'full',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    overflowX: 'hidden',
    overflowY: 'auto',
  },
});

export const Page = () => {
  return (
    <PageComp>
      <Box
        background="primary.800"
        p="3"
        shadow="sm"
        color="white"
        position="sticky"
        display="flex"
        flexDirection="row"
        alignItems="center"
      >
        <Text fontSize="3xl">REVERSI</Text>
        <Spacer />
        <ColorModeToggle />
        <Tooltip label="Go to splash screen">
          <IconButton
            aria-label={'Go to splash screen'}
            icon={<SmallCloseIcon />}
            as={Link}
            variant="ghost"
            to="/"
          />
        </Tooltip>
      </Box>
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
      <Box
        p="1"
        px="4"
        textAlign="right"
        background="primary.800"
        color="white"
      >
        Made by: Aryslan Yakshibaev
      </Box>
    </PageComp>
  );
};
