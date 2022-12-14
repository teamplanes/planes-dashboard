import React, { useEffect, useState } from 'react';
import {
  Text,
  Image,
  Flex,
  Box,
  Link,
  useColorModeValue,
  SkeletonCircle,
  Skeleton,
} from '@chakra-ui/react';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
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

    return messages;
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
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState('');
  const [permaLink, setPermalink] = useState('');
  const [currentMessage, setCurrentMessage] = useState(0);
  const [loading, setLoading] = useState(false);
  const incrementMessage = () => {
    if (currentMessage === messages.length - 1) {
    } else {
      setCurrentMessage(currentMessage + 1);
    }
  };
  const decrementMessage = () => {
    if (currentMessage === 0) {
    } else {
      setCurrentMessage(currentMessage - 1);
    }
  };
  const getSlackData = async () => {
    const messages = await getMessages();
    setMessages(messages);
  };

  useEffect(() => {
    getSlackData();
  }, []);

  useEffect(() => {
    const getMessageDetails = async () => {
      setLoading(true);
      const user = await getUser(messages[currentMessage].user);
      const link = await getPermaLink(messages[currentMessage]);
      setPermalink(link);
      setUser(user);
      setLoading(false);
    };
    if (messages.length !== 0) {
      getMessageDetails();
    }
  }, [currentMessage, messages]);
  const name = user.first_name + ' ' + user.last_name;

  return (
    <Flex flexDir="column" w="100%">
      <Section title="Announcements">
        <BorderBox>
          <Flex flexDir="row" alignItems="center">
            {loading ? (
              <SkeletonCircle size={45} mr={4} />
            ) : (
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
            )}
            <Skeleton isLoaded={!loading || name}>
              <Text
                fontWeight={700}
                fontSize={15}
                lineHeight="20px"
                letterSpacing="-0.02em"
              >
                {name}
              </Text>
            </Skeleton>
          </Flex>
          <Text
            py="30px"
            fontWeight={500}
            fontSize={30}
            lineHeight="39px"
            letterSpacing="-0.02em"
          >
            {messages[currentMessage]?.text || 'Loading'}
          </Text>
          <Box mt={2} />
          <Link href={permaLink} _hover={{ textDecoration: 'none' }}>
            <Box
              as="button"
              bg={useColorModeValue('orange', 'blue')}
              width="270px"
              borderRadius="2px"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              py="15px"
              pl="15px"
              pr="20px"
              _hover={{
                boxShadow: '0 0.5em 0.5em -0.4em black',
                transform: 'translateY(-0.25em)',
              }}
            >
              <Text
                fontWeight={700}
                fontSize={20}
                lineHeight="26px"
                letterSpacing="-0.02em"
                color={useColorModeValue('dark', 'white')}
              >
                View in Slack
              </Text>
              <FiArrowRight size={32} />
            </Box>
          </Link>
        </BorderBox>
      </Section>
      <Flex flexDir="row" justifyContent="space-between" mt={4}>
        <Flex
          w="60px"
          h="60px"
          borderRadius="50%"
          bgColor={useColorModeValue('dark', 'cream')}
          className={currentMessage === 0 ? 'disabled' : 'active'}
          justifyContent="center"
          alignItems="center"
          onClick={decrementMessage}
          color={useColorModeValue('white', 'dark')}
        >
          <FiArrowLeft size={48} />
        </Flex>
        <Flex
          w="60px"
          h="60px"
          borderRadius="50%"
          bgColor={useColorModeValue('dark', 'cream')}
          className={
            currentMessage === messages.length - 1 ? 'disabled' : 'active'
          }
          justifyContent="center"
          alignItems="center"
          onClick={incrementMessage}
          color={useColorModeValue('white', 'dark')}
        >
          <FiArrowRight size={48} />
        </Flex>
      </Flex>
    </Flex>
  );
};
