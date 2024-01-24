const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const routes = require('./routes/index');

app.use('/api', routes);

app.listen(3000);
