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
  res.send('列出全部 Todo')
})

// 新增一筆 Todo 頁面
router.get('/new', authenticated, (req, res) => {
  res.send('新增 Todo 頁面')
})

// 顯示一筆 Todo 的詳細內容
router.get('/:id', authenticated, (req, res) => {
  res.send('顯示一筆 Todo')
})

// 新增一筆  Todo
router.post('/', authenticated, (req, res) => {
  res.send('新增一筆  Todo')
})

// 修改 Todo 頁面
router.get('/:id/edit', authenticated, (req, res) => {
  res.send('修改 Todo 頁面')
})

// 修改 Todo
router.put('/:id', authenticated, (req, res) => {
  res.send('修改 Todo')
})

// 刪除 Todo
router.delete('/:id/delete', authenticated, (req, res) => {
  res.send('刪除 Todo')
})

// // 列出全部 Todo
// router.get('/', authenticated, (req, res) => {
//   return res.redirect('/')
// })

// // 新增一筆 Todo 頁面
// router.get('/new', authenticated, (req, res) => {
//   return res.render('new')
// })

// // 顯示一筆 Todo 的詳細內容
// router.get('/:id', authenticated, (req, res) => {
//   Todo.findByPk({ where: { _id: req.params.id, userId: req.user._id } })
//     .then(todo => {
//       return res.render('detail', { todo: todo })
//     })
// })

// // 新增一筆  Todo
// router.post('/', authenticated, (req, res) => {
//   // 建立 Todo model 實例
//   const todo = new Todo({
//     name: req.body.name, // name 是從 new 頁面 form 傳過來
//     userId: req.user._id
//   })
//   // 存入資料庫
//   todo.save(err => {
//     if (err) return console.error(err)
//     return res.redirect('/') // 新增完後，將使用者導回首頁
//   })
// })

// // 修改 Todo 頁面
// router.get('/:id/edit', authenticated, (req, res) => {
//   Todo.findByPk({ where: { _id: req.params.id, userId: req.user._id } })
//     .then(todo => {
//       return res.render('edit', { todo: todo })
//     })
// })

// // 修改 Todo
// router.put('/:id', authenticated, (req, res) => {
//   Todo.findByPk({ where: { _id: req.params.id, userId: req.user._id } })
//     .then(todo => {
//       todo.name = req.body.name
//       if (req.body.done === 'on') {
//         todo.done = true
//       } else {
//         todo.done = false
//       }
//       todo.save(err => {
//         if (err) return console.error(err)
//         return res.redirect(`/todos/${req.params.id}`)
//       })
//     })
// })

// // 刪除 Todo
// router.delete('/:id/delete', authenticated, (req, res) => {
//   Todo.findByPk({ where: { _id: req.params.id, userId: req.user._id } })
//     .then(todo => {
//       todo.remove(err => {
//         if (err) return console.error(err)
//         return res.redirect('/')
//       })
//     })
// })

// 設定 /todos 路由
module.exports = router