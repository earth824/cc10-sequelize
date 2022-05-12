const { Sequelize, DataTypes, Op } = require('sequelize');

const sequelize = new Sequelize('cc10_todo_list', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize
  .authenticate()
  .then(() => console.log('DB connected'))
  .catch(err => console.log(err.message));

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

const Todo = sequelize.define(
  'Todo',
  {
    // id: {
    //   type: DataTypes.INTEGER,
    //   primaryKey: true,
    //   autoIncrement: true
    // },
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
      // references: {
      //   model: User,
      //   key: 'id'
      // }
    }
  },
  {
    timestamps: false
  }
);

User.hasMany(Todo, { foreignKey: 'userId' });
Todo.belongsTo(User, { foreignKey: 'userId' });

// User.findAll({ include: Todo })
//   .then(res => console.log(JSON.stringify(res, null, 2)))
//   .catch(err => console.log(err));

// Todo.findAll({ include: User })
//   .then(res => console.log(JSON.stringify(res, null, 2)))
//   .catch(err => console.log(err));

Todo.findAll({
  attributes: ['title'],
  include: {
    model: User,
    attributes: ['username']
  }
})
  .then(res => console.log(JSON.stringify(res, null, 2)))
  .catch(err => console.log(err));

// Todo.findAll().then(res => console.log(JSON.stringify(res, null, 2)));
// Todo.create({ title: '#$&abcd', userId: 1 }).catch(err => console.log(err));

// const user = new User({ username: 'jamie' }); // { username: 'jamie'  }
// const user = User.build({ username: 'jane' })
// user
//   .save()
//   .then(res => {
//     console.log('execute save');
//     console.log(res);
//   })
//   .catch(err => console.log(err));

// const userPromise = User.create({ username: 'federick' });
// userPromise
//   .then(res => console.log(JSON.stringify(res, null, 2)))
//   .catch(err => console.log(err));

// User.update({ username: 'jotnathan' }, { where: { id: 2 } }).then(res =>
//   console.log(JSON.stringify(res, null, 10))
// );

// User.destroy({
//   where: {
//     id: 10
//   }
// }).then(res => console.log(res));

// User.create({ id: 10, username: 'bob' });

// User.findAll().then(res => console.log(JSON.stringify(res, null, 2)));
// User.findAll({
//   where: {
//     id: 11,
//     username: 'federick'
//   }
// }).then(res => console.log(JSON.stringify(res, null, 2)));

// User.findAll({
//   where: {
//     id: {
//       // [Op.eq]: 11
//       [Op.ne]: 11
//     },
//     username: {
//       [Op.like]: 'j%'
//     }
//   }
// }).then(res => console.log(JSON.stringify(res, null, 2)));

// User.findAll({
//   where: {
//     [Op.or]: [
//       {
//         id: 11
//       },
//       {
//         id: 2
//       },
//       {
//         username: {
//           [Op.like]: 'j%'
//         }
//       }
//     ],
//     id: 1
//   }
// }).then(res => console.log(JSON.stringify(res, null, 2)));

// User.findAll({
//   where: {
//     id: [1, 2, 3, 4, 5, 6, 7]
//   },
//   // attributes: ['username']
//   attributes: {
//     exclude: ['id']
//   }
// }).then(res => console.log(JSON.stringify(res, null, 2)));

// User.findAll({
//   where: {
//     id: [1, 2, 3, 4, 5, 6, 7]
//   },
//   // attributes: ['username']
//   attributes: {
//     exclude: ['id']
//   },
//   // order: ['username']
//   order: [['username', 'desc'], 'id']
// }).then(res => console.log(JSON.stringify(res, null, 2)));

// User.findAll({
//   where: {
//     // id: [1, 2, 3, 4, 5, 6, 7]
//   },
//   // attributes: ['username']
//   attributes: {
//     exclude: ['id']
//   },
//   // order: ['username']
//   order: [['username', 'desc'], 'id'],
//   group: ['username'],
//   limit: 5,
//   offset: 2
// }).then(res => console.log(JSON.stringify(res, null, 2)));

// User.findAll({
//   attributes: [[sequelize.fn('count', sequelize.col('id')), 'count']]
//   // attributes: ['id', ['username', 'uname']]
// }).then(res => console.log(JSON.stringify(res, null, 2)));

// User.findAll({
//   attributes: [[sequelize.fn('max', sequelize.col('id')), 'maxId']]
//   // attributes: ['id', ['username', 'uname']]
// }).then(res => console.log(JSON.stringify(res, null, 2)));

// User.findAll({
//   attributes: [[sequelize.fn('max', sequelize.col('id')), 'maxId'], 'id'],
//   group: ['id']
// }).then(res => console.log(JSON.stringify(res, null, 2)));
