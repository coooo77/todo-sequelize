'use strict';
const todoList = require('../models/seeds/todos')

module.exports = {

  up: async (queryInterface, Sequelize) => {
    const todos = [
      {
        name: "todo-1",
        done: false,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "todo-2",
        done: false,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "todo-3",
        done: false,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "todo-4",
        done: false,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "todo-5",
        done: false,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "todo-6",
        done: false,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "todo-1",
        done: false,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "todo-2",
        done: false,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "todo-3",
        done: false,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "todo-4",
        done: false,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "todo-5",
        done: false,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "todo-6",
        done: false,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    return queryInterface.bulkInsert('Todos', todos);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Todos', null, {});
  }
};

// 用非同步找UserId，UserId被洗掉了
// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     const db = require('../models')
//     const User = db.User
//     await User.findAll({
//       raw: true,
//       nest: true
//     })
//       .then((users) => {
//         const todos = []
//         users.forEach((user) => {
//           for (let i = 0; i < todoList.todos.length; i++) {
//             const newTodo = todoList.todos[i]
//             newTodo.userId = user.id
//             newTodo.createdAt = new Date()
//             newTodo.updatedAt = new Date()
//             todos.push(newTodo)
//           }
//         })
//         return queryInterface.bulkInsert('Todos', todos);
//       })
//   },

//   down: (queryInterface, Sequelize) => {
//     return queryInterface.bulkDelete('Todos', null, {});
//   }
// };

// 一開始的寫法，想要取代下面的陣列資料，newTodo.userId = id的輸出結果都是id=2，不符合預期
// module.exports = {
//   up: (queryInterface, Sequelize) => {
//     const todos = []
//     for (let id = 1; id < 3; id++) {
//       for (let i = 0; i < todoList.todos.length; i++) {
//         const newTodo = todoList.todos[i]
//         newTodo.userId = id
//         newTodo.createdAt = new Date()
//         newTodo.updatedAt = new Date()
//         todos.push(newTodo)
//       }
//       console.log('todos', todos)
//     }

//     return queryInterface.bulkInsert('Todos', todos);
//   },

//   down: (queryInterface, Sequelize) => {
//     return queryInterface.bulkDelete('Todos', null, {});
//   }
// };



