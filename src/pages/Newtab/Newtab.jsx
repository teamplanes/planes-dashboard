import React from 'react';
import { Header } from './components/header';
import { Announcements } from './components/announcements';
import { QuickAccessTools } from './components/quick-access-tools';
import { Box, Flex, Text } from '@chakra-ui/react';
import { Section } from './components/section';
import { BorderBox } from './components/border-box';

const Newtab = () => {
  return (
    <Box bg="#ffeada" minHeight="100vh" p="100px">
      <Header />
      <Flex mt={30} flexDirection="column" gap="45px">
        <Flex gap="15px">
          <Flex flex={3}>
            <Announcements />
            {/* Slack Channel announcements */}
            {/* Runn timesheet notifications */}
          </Flex>
          <Flex flex={1}>
            <Section title="Reminders">
              <BorderBox>
                <Text>Reminders here</Text>
              </BorderBox>
            </Section>
          </Flex>
        </Flex>
        {/* Quick access links  */}
        <QuickAccessTools />
      </Flex>
    </Box>
  );
};

export default Newtab;
