import React from 'react';
import { Text, Box, Image } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../Newtab/components/theme';
import planeImage from '../../assets/img/plane.png';
import planesLogo from '../../assets/img/planes_logo.svg';

const Popup = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box
        bg="cream"
        w="300px"
        h="400px"
        p="40px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="30px"
      >
        <Image w="112px" src={planesLogo} alt="planes' logo" />
        <Image w="100%" src={planeImage} alt="plane" />
        <Text
          fontWeight={500}
          fontSize={15}
          lineHeight="20px"
          letterSpacing="-0.02em"
          align="center"
        >
          Open a new tab to view the dashboard
        </Text>
      </Box>
    </ChakraProvider>
  );
};

export default Popup;
