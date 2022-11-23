import React, { useEffect, useState } from 'react';
import { Text, Image, Stack, Heading, Card, CardBody } from '@chakra-ui/react';
import { getSlackFetch } from '../utils/getSlackFetch';

const getMessages = async () => {
  try {
    const conversationHistory = await getSlackFetch(
      '/conversations.history?channel=C04CX09AFFS'
    );

    const messages = conversationHistory.messages.filter(
      (message) => message.subtype !== 'channel_join'
    );

    // Print results
    console.log(
      messages.length + ' messages found in ' + 'planes-dashboard channel'
    );
    return messages[0];
  } catch (error) {
    console.error(error);
  }
};

const getUser = async (userId) => {
  try {
    const user = await getSlackFetch(`/users.profile.get?user=${userId}`);

    // Print results
    console.log('user with id: ' + userId + user);
    return user.profile;
  } catch (error) {
    console.error(error);
  }
};

const tests = [];
export const Announcements = () => {
  // WebClient instantiates a client that can call API methods
  // When using Bolt, you can use either `app.client` or the `client` passed to listeners.
  const [message, setMessage] = useState('');
  const [user, setUser] = useState('');
  const test = async () => {
    const message = await getMessages();
    const user = await getUser(message.user);
    setUser(user);
    setMessage(message.text);
  };

  useEffect(() => {
    test();
  }, []);

  return (
    <Card
      direction="row"
      overflow="hidden"
      variant="outline"
      bg="#42C7FF"
      w="500px"
      h="300px"
      ml="20%"
      borderRadius={8}
    >
      <Image
        objectFit="cover"
        maxW={{ base: '100%', sm: '200px' }}
        src={user.image_192}
        alt="User Avatar"
      />

      <Stack>
        <CardBody>
          <Heading size="md">The perfect latte</Heading>

          <Text py="2">
            Caffè latte is a coffee beverage of Italian origin made with
            espresso and steamed milk.
          </Text>
        </CardBody>
      </Stack>
    </Card>
  );
};
