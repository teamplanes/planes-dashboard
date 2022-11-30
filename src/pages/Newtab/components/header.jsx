import React from 'react';
import { Flex, Switch, Heading, useColorMode } from '@chakra-ui/react';

export const Header = () => {
  // returns the greeting for the approriate time of day
  // returns the users name... which is taken from Google login otherwise just returns there.

  const [name, setName] = React.useState('');
  chrome.identity.getProfileUserInfo({ accountStatus: 'ANY' }, function (info) {
    if (info.email) {
      setName(info.email.split('@', 1));
    }
  });

  const { toggleColorMode } = useColorMode();

  const getGreeting = () => {
    const date = new Date();
    const hours = date.getHours();
    if (hours < 12) {
      return 'Good morning';
    } else if (hours < 18) {
      return 'Good afternoon';
    } else if (hours < 22) {
      return 'Good evening';
    } else {
      return 'Good night';
    }
  };

  return (
    <Flex w="100%" justify="space-between">
      <Heading>{`${getGreeting()}, ${name}!`}</Heading>
      <Switch onChange={toggleColorMode} />
    </Flex>
  );
};
