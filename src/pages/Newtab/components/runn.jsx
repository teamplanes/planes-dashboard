// get the users email
// use that to get the users Runn information

// 1. use email
import React, { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { getRunnFetch } from '../utils/getRunnFetch';

export const Runn = () => {
  const [email, setEmail] = React.useState('');
  const [person, setPerson] = React.useState();

  chrome.identity.getProfileUserInfo({ accountStatus: 'ANY' }, function (info) {
    if (info.email) {
      setEmail(info.email);
    }
  });

  const date = new Date();
  const dd = String(date.getDate()).padStart(2, '0') - 7;
  const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = date.getFullYear();
  const firstDay = `${yyyy}-${mm}-${dd}`;
  console.log(firstDay);

  useEffect(() => {
    async function getData() {
      const [actuals, projects, people] = await Promise.all([
        getRunnFetch('actuals', { start: firstDay }),
        getRunnFetch('projects'),
        // how to get the person ID our to use in the url?
        getRunnFetch(`people/${people.id}`, {
          include_projects: true,
          include_placeholders: true,
        }),
      ]);
      console.log('actuals', actuals);
      console.log('pople', people);

      setPerson(people.find((person) => person.email === email));
    }
    getData();
  }, []);

  console.log('kuni', person);
  //   console.log('actuals', actuals);

  return <Box></Box>;
};
// 1. find user in runn
// 1. get id
// return schedules

// 1. check the schedules and the actual figures

// 2. alert on friday! fill in your timesheet. (you are sheduled for x )
