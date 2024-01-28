const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const routes = require('./routes/index');
const sequelize = require('./util/database');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'views')));

app.use('/api', routes);

sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch(console.log);
