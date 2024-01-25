const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Todo = sequelize.define('todo', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  status: {
    type: Sequelize.ENUM('NOTSTARTED', 'PROGRESS', 'DONE'),
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: Sequelize.STRING,
});

module.exports = Todo;
