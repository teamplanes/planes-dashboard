// get the users email
// use that to get the users Runn information

// 1. use email
import React, { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { getRunnFetch } from '../utils/getRunnFetch';

const getPeopleData = async () => {
  try {
    const people = await getRunnFetch(`people`, {
      include_projects: true,
      include_placeholders: true,
    });
    return people;
  } catch (error) {
    console.error(error.message);
  }
};

const getActualsData = async () => {
  //   const date = new Date();
  //   const dd = String(date.getDate()).padStart(2, '0');
  //   const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
  //   const yyyy = date.getFullYear();
  //   const firstDay = `${yyyy}-${mm}-${dd}`;
  //   console.log(firstDay);
  try {
    const [actuals] = await getRunnFetch('actuals', { start: Date.now() });
    return actuals;
  } catch (error) {
    console.error(error.message);
  }
};

export const Runn = () => {
  const [email, setEmail] = React.useState('');
  const [person, setPerson] = React.useState();
  const [people, setPeople] = React.useState();
  const [personId, setPersonId] = React.useState();

  chrome.identity.getProfileUserInfo({ accountStatus: 'ANY' }, function (info) {
    if (info.email) {
      setEmail(info.email);
    }
  });
  console.log('google', email);

  const getData = async () => {
    const peopleData = await getPeopleData();
    setPeople(peopleData);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (people && email && person) {
      setPerson(people.find((person) => person.email === email));
      setPersonId(person.id);
    }
  }, [people, email, person]);

  return <Box></Box>;
};
// 1. find user in runn
// 1. get id
// return schedules

// 1. check the schedules and the actual figures

// 2. alert on friday! fill in your timesheet. (you are sheduled for x )
