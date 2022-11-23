import React from 'react';
import { Text, Box } from '@chakra-ui/react';

export const Greeting = () => {
  // returns the greeting for the approriate time of day
  // returns the users name... which is taken from Google login otherwise just returns there.
  return (
    <Box>
      <Text> Hello,</Text>
      <Text> there</Text>
    </Box>
  );
};
