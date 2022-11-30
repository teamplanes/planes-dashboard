import React from 'react';
import { Text, Box, Flex, SimpleGrid } from '@chakra-ui/react';
import { Section } from './section';
import jiraImage from '../../../assets/img/jira.png';
import { BorderBox } from './border-box';

const tools = [
  { title: 'Github', src: '/github.png', link: 'https://github.com/' },
  { title: 'Bippit', src: '/bippit.png', link: 'https://app.bippit.com/' },
  {
    title: 'Charlie HR',
    src: '/charliehr.png',
    link: 'https://planes.charliehr.com/',
  },
  {
    title: 'Leapsome',
    src: '/leapsome.png',
    link: 'https://www.leapsome.com/',
  },
  {
    title: 'Sunlight',
    src: '/sunlight.png',
    link: 'https://grow.sunlight.is/playlists',
  },
  { title: 'Runn', src: '/runn.png', link: 'https://app.runn.io/' },
  {
    title: 'Jira',
    src: jiraImage,
    link: 'https://planesstudio.atlassian.net/jira/your-work',
  },
];
export const QuickAccessTools = () => {
  return (
    <Section title="Tools">
      <SimpleGrid minChildWidth="200px" spacing="15px">
        {tools.map((tool) => (
          <Box as="button" key={tool.title}>
            <BorderBox>
              <Flex alignItems="center" gap={5}>
                {/* <img width={50} src={tool.src} alt={tool.title} /> */}
                <Box w={50} h={50} bg="blu" opacity={0.1}/>
                <Text>{tool.title}</Text>
              </Flex>
            </BorderBox>
          </Box>
        ))}
      </SimpleGrid>
    </Section>
  );
};
