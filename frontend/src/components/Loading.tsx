import { Box, Spinner } from '@chakra-ui/react';

export const Loading = () => {
  return (
    <Box
      flexGrow="100000"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Spinner />
    </Box>
  );
};
