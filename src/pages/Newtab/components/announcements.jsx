import React, { useEffect, useState } from 'react';
import { Text, Image, Box, Heading, Flex, CardBody } from '@chakra-ui/react';
import { getSlackFetch } from '../utils/getSlackFetch';
import { Section } from './section';

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
      messages.length + ' messages found in planes-dashboard channel'
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
    console.log('user with id: ' + userId + JSON.stringify(user));
    return user.profile;
  } catch (error) {
    console.error(error);
  }
};

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
  const name = user.first_name + ' ' + user.last_name;

  return (
    <Section title="Announcements">
      <Flex direction="row">
        <Image
          objectFit="cover"
          maxW={{ base: '100%', sm: '200px' }}
          src={user.image_192}
          alt="User Avatar"
        />
        <CardBody>
          <Heading size="md">{name}</Heading>
          <Box mt={2} />
          <Text>{message}</Text>
        </CardBody>
      </Flex>
    </Section>
  );
};
