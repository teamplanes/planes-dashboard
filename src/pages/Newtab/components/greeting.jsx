import React from 'react';
import { Text, Flex } from '@chakra-ui/react';

export const Greeting = () => {
  // returns the greeting for the approriate time of day
  // returns the users name... which is taken from Google login otherwise just returns there.

  const [email, setEmail] = React.useState('');
  chrome.identity.getProfileUserInfo({ accountStatus: 'ANY' }, function (info) {
    if (info.email) {
      setEmail(info.email);
    }
  });

  return (
    <Flex w="100%" justify="space-between">
      <Flex>
        {email ? (
          <Text> Hello, {email.split('@', 1)}</Text>
        ) : (
          <Text> Hello there</Text>
        )}
      </Flex>
      <Flex>Dark mode icon</Flex>
    </Flex>
  );
};
