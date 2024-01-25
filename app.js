const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const routes = require('./routes/index');
const sequelize = require('./util/database');

app.use(bodyParser, bodyParser.urlencoded({ extended: false }));

app.use('/api', routes);

sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch(console.log);
