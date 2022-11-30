import React from 'react';
import { Text, Flex, Switch } from '@chakra-ui/react';

export const Greeting = () => {
  // returns the greeting for the approriate time of day
  // returns the users name... which is taken from Google login otherwise just returns there.

  const [email, setEmail] = React.useState('');
  chrome.identity.getProfileUserInfo({ accountStatus: 'ANY' }, function (info) {
    if (info.email) {
      setEmail(info.email);
    }
  });
  const name = email.split('@', 1);

  return (
    <Flex boxSizing="border-box" p="16px 24px" w="100%" justify="space-between">
      {email ? (
        <Text textTransform="capitalize">{`Hello, ${name}!`}</Text>
      ) : (
        <Text> Hello there!</Text>
      )}
      <Switch />
    </Flex>
  );
};
