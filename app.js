// const User = require('./models/User');
// const Todo = require('./models/Todo');
const { User, Todo } = require('./models/associate');

User.findAll({ include: Todo }).then(res =>
  console.log(JSON.stringify(res, null, 2))
);
Todo.findAll({ include: User }).then(res =>
  console.log(JSON.stringify(res, null, 2))
);
