// 載入 model
const db = require('../')
const User = db.User
const Todo = db.Todo
const todoList = require('./todos')
const userList = require('./users')
const bcryptjs = require('bcryptjs')

const users = []
for (let i = 0; i < userList.users.length; i++) {
  const newUser = new User(userList.users[i])
  bcryptjs.genSalt(10, (err, salt) => {
    bcryptjs.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err
      newUser.password = hash
      users.push(newUser)
      newUser
        .save()
        .then(user => {
          for (let x = 0; x < todoList.todos.length; x++) {
            todoList.todos[x].UserId = users[i].id
            Todo.create(todoList.todos[x])
          }
        })
        .catch(err => console.log(err))
    })
  })
}