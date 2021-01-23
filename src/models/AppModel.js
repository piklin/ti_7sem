const getFligths = async () => {
  const response = await fetch('http://localhost:4321/fligths');
  const fligths = await response.json();

  return fligths;
};

const addFligth= async (fligth) => {
  const response = await fetch('http://localhost:4321/fligths', {
    method: 'POST',
    body: JSON.stringify(fligth),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const { info } = await response.json();

  return info;
};

const addClient = async ({ fligthId, client }) => {
  const response = await fetch(
    `http://localhost:4321/fligths/${fligthId}/clients`,
    {
      method: 'POST',
      body: JSON.stringify(client),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const { info } = await response.json();

  return info;
};

const editClient = async ({ fligthId, clientId, clientName }) => {
  const response = await fetch(
    `http://localhost:4321/fligths/${fligthId}/clients/${clientId}`,
    {
      method: 'PATCH',
      body: JSON.stringify({
        newClientName: clientName,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const { info } = await response.json();

  return info;
};

const removeClient = async ({ fligthId, clientId }) => {
  const response = await fetch(
    `http://localhost:4321/fligths/${fligthId}/clients/${clientId}`,
    {
      method: 'DELETE',
    }
  );

  const { info } = await response.json();

  return info;
};

export {
  getFligths,
  addFligth,
  addClient,
  editClient,
  removeClient
};
