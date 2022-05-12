const { DataTypes } = require('sequelize');
const sequelize = require('./connect');
// const User = require('./User');

const Todo = sequelize.define(
  'Todo',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true
      }
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id'
    }
  },
  {
    timestamps: false
  }
);

// Todo.belongsTo(User, { foreignKey: 'userId' });

module.exports = Todo;
