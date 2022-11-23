import React from 'react';
import { Text, Box, Image, Button } from '@chakra-ui/react';

const tools = [
  { title: 'Github', src: '', link: 'https://github.com/' },
  { title: 'Bippit', src: '', link: 'https://app.bippit.com/' },
  { title: 'Charlie HR', src: '', link: 'https://planes.charliehr.com/' },
  { title: 'Leapsome', src: '', link: 'https://www.leapsome.com/' },
  { title: 'Sunlight', src: '', link: 'https://grow.sunlight.is/playlists' },
  { title: 'Runn', src: '', link: 'https://app.runn.io/' },
  {
    title: 'Jira',
    src: '',
    link: 'https://planesstudio.atlassian.net/jira/your-work',
  },
];
export const QuickAccessTools = () => {
  return (
    <Box display="flex" justifyContent="flexEnd" width="100%">
      <Box>
        <Text> Quick Access Tools</Text>
      </Box>
      <Box>
        {tools.map((tool) => {
          return (
            <Button variant="outline" key={tool.title}>
              <Text> {tool.title}</Text>
              <Image src={tool.src} w="100px" h="100px" />
            </Button>
          );
        })}
      </Box>
    </Box>
  );
};
