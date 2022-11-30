import React, { useEffect, useState } from 'react';
import { Text, Image, Flex, Box, Link, Button } from '@chakra-ui/react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { getSlackFetch } from '../utils/getSlackFetch';
import { Section } from './section';
import { BorderBox } from './border-box';

const getMessages = async () => {
  try {
    const conversationHistory = await getSlackFetch(
      '/conversations.history?channel=C04CX09AFFS'
    );

    const messages = conversationHistory.messages.filter(
      (message) => message.subtype !== 'channel_join'
    );

    return messages[0];
  } catch (error) {
    console.error(error);
  }
};

const getUser = async (userId) => {
  try {
    const user = await getSlackFetch(`/users.profile.get?user=${userId}`);

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
    return response.permalink;
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
  const getSlackData = async () => {
    const message = await getMessages();
    const user = await getUser(message.user);
    const link = await getPermaLink(message);
    setPermalink(link);
    setUser(user);
    setMessage(message.text);
  };

  useEffect(() => {
    getSlackData();
  }, []);
  const name = user.first_name + ' ' + user.last_name;

  return (
    <Section title="Announcements">
      <BorderBox p={8}>
        <Flex flexDir="row" alignItems="center">
          <Image
            objectFit="cover"
            w="45px"
            h="45px"
            src={user.image_48}
            alt="User Avatar"
            borderRadius="50%"
            border="1px solid #497AD9"
            mr={4}
          />
          <Text size="md" mt={0} fontSize="16px" fontWeight="700">
            {name}
          </Text>
        </Flex>
        <Text py={4} my={6} fontSize="24px">
          {message}
        </Text>
        <Box mt={2} />
        <Link href={permaLink}>
          <Button
            rightIcon={<AiOutlineArrowRight />}
            bgColor="orange"
            mb={2}
            _hover={{}}
            borderRadius="2px"
          >
            View in Slack
          </Button>
        </Link>
      </BorderBox>
    </Section>
  );
};
