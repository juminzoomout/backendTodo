const Sequleize = require('sequelize');

const sequelize = new Sequleize('backend-todo', 'root', 'mdudb^1350', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
