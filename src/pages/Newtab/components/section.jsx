import React from 'react';
import { Text, Box } from '@chakra-ui/react';

export const Section = ({ title, children }) => {
  return (
    <Box w="100%">
      <Text fontSize="24px">{title}</Text>
      <Box mt="10px" />
      {children}
    </Box>
  );
};
