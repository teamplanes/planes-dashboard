import React from 'react';
import { Greeting } from './components/greeting';
import { Announcements } from './components/announcements';
import { QuickAccessTools } from './components/quick-access-tools';
import { Box, Flex, Text } from '@chakra-ui/react';
import { Section } from './components/section';

const Newtab = () => {
  return (
    <Box bg="#ffeada" minHeight="100vh">
      {/* greeting */}
      <Greeting />
      <Box mx={8}>
        <Flex gap={10} mb={8}>
          <Flex flexDir="column" flex={3} gap={10}>
            <Announcements />
            {/* Slack Channel announcements */}
            {/* Runn timesheet notifications */}
          </Flex>
          <Flex flex={1}>
            <Section title="Reminders">
              <Text>Reminders here</Text>
            </Section>
          </Flex>
        </Flex>
        {/* Quick access links  */}
        <QuickAccessTools />
      </Box>
    </Box>
  );
};

export default Newtab;
