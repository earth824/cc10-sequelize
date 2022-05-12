const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('cc10_todo_list', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
