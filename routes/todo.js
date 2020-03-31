// 新增 todo 路由 routes / todo.js，載入 Todo 與 User 兩個 models 以及 auth middleware，並設定 CRUD 的路由，回傳簡單訊息

const express = require('express')
const router = express.Router()
const db = require('../models')
const User = db.User
const Todo = db.Todo
// 載入 auth middleware 裡的 authenticated 方法
const { authenticated } = require('../config/auth')

// 列出全部 Todo
router.get('/', authenticated, (req, res) => {
  res.redirect('/')
})

// 新增一筆 Todo 頁面
router.get('/new', authenticated, (req, res) => {
  return res.render('new')
})

// 新增一筆  Todo
router.post('/', authenticated, (req, res) => {
  const data = req.body
  const check = Object.values(data).filter(value => value === "").length
  if (check) {
    const errors = [{ message: '資料不齊全' }]
    res.render('new', { data, errors })
  } else {
    Todo.create({
      name: req.body.name,
      done: false,
      UserId: req.user.id
    })
      .then((todo) => { return res.redirect('/') })
      .catch((error) => { return res.status(422).json(error) })
  }

})

// 顯示一筆 Todo 的詳細內容
router.get('/:id', authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error("user not found");

      return Todo.findOne({
        where: {
          UserId: req.user.id,
          Id: req.params.id
        }
      })
    })
    .then((todo) => { return res.render('detail', { todo: todo.get() }) })
    .catch((error) => { return res.status(422).json(error) })
})

// 修改 Todo 頁面
router.get('/:id/edit', authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error("user not found")
      return Todo.findOne({
        where: {
          Id: req.params.id,
          UserId: req.user.id,
        }
      })
    })
    .then((todo) => { return res.render('edit', { todo: todo.get() }) })
})

// 修改 Todo
router.put('/:id', authenticated, (req, res) => {
  req.body.id = req.params.id
  const data = req.body
  const check = Object.values(data).filter(value => value === "").length
  if (check) {
    const errors = [{ message: '資料不齊全' }]
    res.render('edit', { data, errors })
  } else {
    Todo.findOne({
      where: {
        Id: req.params.id,
        UserId: req.user.id,
      }
    })
      .then((todo) => {
        todo.name = req.body.name
        todo.done = req.body.done === "on"

        return todo.save()
      })
      .then((todo) => { return res.redirect(`/todos/${req.params.id}`) })
      .catch((error) => { return res.status(422).json(error) })
  }
})

// 刪除 Todo
router.delete('/:id/delete', authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error("user not found")

      return Todo.destroy({
        where: {
          UserId: req.user.id,
          Id: req.params.id
        }
      })
    })
    .then((todo) => { return res.redirect('/') })
    .catch((error) => { return res.status(422).json(error) })
})

// 設定 /todos 路由
module.exports = router