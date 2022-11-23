export const getSlackFetch = async (url) => {
  const result = await fetch(`https://slack.com/api${url}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization:
        'Bearer xoxb-167145621489-4427851286449-iirrvcEqxbASU0RyXOfwfOVO',
    },
  });

  const executionResult = await result.json();

  return executionResult;
};
