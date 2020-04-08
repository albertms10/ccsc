const express = require('express');
const app = express();

const PORT = 5000;
const HOST = 'localhost';

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const connection = require('./connection');
app.set('connection', connection);

require('./routes/agrupacions')(app);
require('./routes/associacio')(app);
require('./routes/esdeveniments')(app);
require('./routes/establiments')(app);
require('./routes/localitzacions')(app);
require('./routes/socis')(app);
require('./routes/usuaris')(app);

app.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT}`);

process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
  })
  .on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
  });
