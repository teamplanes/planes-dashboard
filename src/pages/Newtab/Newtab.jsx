import React from 'react';
import { Greeting } from './components/greeting';
import { Announcements } from './components/annoucements';
import { QuickAccessTools } from './components/quick-access-tools';
import { Runn } from './components/runn';
const Newtab = () => {
  return (
    <>
      {/* greeting */}
      <Greeting />
      <Announcements />
      {/* Slack Channel announcements */}
      {/* Runn timesheet notifications */}
      <Runn />
      {/* Quick access links  */}
      <QuickAccessTools />
    </>
  );
};

export default Newtab;
