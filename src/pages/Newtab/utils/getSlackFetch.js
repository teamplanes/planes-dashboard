export const getSlackFetch = async (url) => {
  const result = await fetch(`https://slack.com/api${url}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization:
        'Bearer xoxb-167145621489-4427851286449-Fn1GVweNrd5tRXky4uWUuBP8',
    },
  });

  const executionResult = await result.json();

  return executionResult;
};
