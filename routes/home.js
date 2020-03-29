// 新增首頁路由 routes / home.js，載入 Todo 與 User 兩個 models 以及 auth middleware，並設定一個回傳「列出全部 Todo」的簡單路由

// routes/home.js
const express = require('express')
const router = express.Router()
const db = require('../models')
const User = db.User
const Todo = db.Todo
// 載入 auth middleware 裡的 authenticated 方法
const { authenticated } = require('../config/auth')

// Todo 首頁
router.get('/', authenticated, (req, res) => {
  res.send('列出全部 Todo')
})

module.exports = router