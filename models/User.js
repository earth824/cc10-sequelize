const { DataTypes } = require('sequelize');
const sequelize = require('./connect');
// const Todo = require('./Todo');

const User = sequelize.define(
  'User',
  {
    // default map to table users
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    tableName: 'users',
    timestamps: false
  }
);

// User.hasMany(Todo, { foreignKey: 'userId' });

module.exports = User;
