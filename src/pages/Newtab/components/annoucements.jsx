import React, { useEffect, useState } from 'react';
import {
  Text,
  Image,
  Stack,
  Heading,
  Card,
  CardBody,
  Divider,
  Flex,
  Button,
  Link,
} from '@chakra-ui/react';
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
    console.log('user with id: ' + userId + JSON.stringify(user));
    return user.profile;
  } catch (error) {
    console.error(error);
  }
};

const getPermaLink = async (message) => {
  try {
    const response = await getSlackFetch(
      `/chat.getPermalink?channel=C04CX09AFFS&message_ts=${message.ts}`
    );
    return response.permaLink;
  } catch (error) {
    console.error(error);
  }
};

export const Announcements = () => {
  // WebClient instantiates a client that can call API methods
  // When using Bolt, you can use either `app.client` or the `client` passed to listeners.
  const [message, setMessage] = useState('');
  const [user, setUser] = useState('');
  const [permaLink, setPermalink] = useState('');
  const test = async () => {
    const message = await getMessages();
    const user = await getUser(message.user);
    const link = await getPermaLink(message);
    setPermalink(link);
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
      bg="#1434A4"
      w="50vw"
      h="300px"
      mx="auto"
      borderRadius={8}
    >
      <Flex flexDir="column" w="100%">
        <Flex flexDir="row" p={8} pb={0}>
          <Image
            objectFit="cover"
            w="100px"
            h="100px"
            src={user.image_192}
            alt="User Avatar"
            borderRadius="50%"
          />

          <Stack ml={2} w="100%" color="white">
            <CardBody>
              <Heading size="md" mt={0}>
                {user.first_name + ' ' + user.last_name}
              </Heading>
              <Heading as="h3" size="sm">
                {user.title}
              </Heading>
              <Text py="2" fontSize="24px">
                {message}
              </Text>
              <Button colorScheme="blue" mb={2}>
                View in Slack
              </Button>
              <Divider border="1px solid white" orientation="horizontal" />
            </CardBody>
          </Stack>
        </Flex>
      </Flex>
    </Card>
  );
};
