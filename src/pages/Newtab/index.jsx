import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';

import Newtab from './Newtab';
import './index.css';

createRoot(window.document.querySelector('#app-container')).render(
  <ChakraProvider>
    <Newtab />
  </ChakraProvider>
);
