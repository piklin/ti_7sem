const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { readData, writeData } = require('./utils');

const port = 4321;
const hostname = 'localhost';

let fligths = [];

app.use(bodyParser.json());

// Middleware для разрешения CORS-запросов
app.use((request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Middleware для логирования запросов
app.use((request, response, next) => {
  console.log(new Date().toISOString(), request.method, request.originalUrl);
  next();
});

// Middleware для правильного представления request.body
app.use(express.json());

// ----------- Роуты ----------------

app.options('/', (request, response) => {
  response.statusCode = 200;
  response.send('OK');
});

app.get('/fligths', async (request, response) => {
  fligths = await readData();
  response.setHeader('Content-Type', 'application/json');
  response.json(fligths);
});

app.post('/fligths', async (request, response) => {
  fligths.push(request.body);
  await writeData(fligths);

  response.setHeader('Content-Type', 'application/json');
  response.status(200).json({
    info: `Fligth '${request.body.fligthName}' was successfully added`,
  });
});

app.post('/fligths/:fligthId/clients', async (request, response) => {
  const { name } = request.body;
  const fligthId = Number(request.params.fligthId);

  fligthsNew = fligths.sort(function (a, b) {
              if (a.fligthName > b.fligthName) {
                return 1;
              }
              if (a.fligthName < b.fligthName) {
                return -1;
              }
              return 0;
            });
  fligthsNew[fligthId].clients.push({ name });
  await writeData(fligthsNew);

  response.setHeader('Content-Type', 'application/json');
  response.status(200).json({
    info: `Client '${name}' was successfully added in clientlist '${fligthsNew[fligthId].fligthName}'`,
  });
});

app.patch('/fligths/:fligthId/clients/:clientId', async (request, response) => {
    const { newClientName } = request.body;
    const fligthId = Number(request.params.fligthId);
    const clientId = Number(request.params.clientId);

    fligths[fligthId].clients[clientId].name = newClientName;
    await writeData(fligths);

    response.setHeader('Content-Type', 'application/json');
    response.status(200).json({
      info: `'Name was changed to ${newClientName}'`,
    });
  }
);

app.delete(
  '/fligths/:fligthId/clients/:clientId',
  async (request, response) => {
    const fligthId = Number(request.params.fligthId);
    const clientId = Number(request.params.clientId);

    fligthsNew = fligths.sort(function (a, b) {
              if (a.fligthName > b.fligthName) {
                return 1;
              }
              if (a.fligthName < b.fligthName) {
                return -1;
              }
              return 0;
            });

    const removedClient = fligthsNew[fligthId].clients[clientId];
    fligthsNew[fligthId].clients = fligthsNew[fligthId].clients.filter(
      (fligth, index) => index !== clientId
    );
    await writeData(fligthsNew);

    response.setHeader('Content-Type', 'application/json');
    response
      .status(200)
      .json({ info: `Client '${removedClient}' was successfully deleted` });
  }
);


app.listen(port, hostname, (err) => {
  if (err) {
    console.log('Error: ', err);
  }

  console.log(`server is working on ${hostname}:${port}`);
});
