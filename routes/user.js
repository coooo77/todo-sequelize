// routes/user.js
const express = require('express')
const router = express.Router()
const passport = require('passport')
//  載入 bcryptjs library
const bcryptjs = require('bcryptjs')

// 載入 user model
const db = require('../models')
const User = db.User


// 登入頁面
router.get('/login', (req, res) => {
  res.render('login')
})
// 登入檢查
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureFlash: req.flash('warning_msg', '錯誤的帳號或密碼'),
    failureRedirect: '/users/login',
  })(req, res, next)
})
// 註冊頁面
router.get('/register', (req, res) => {
  res.render('register')
})
// 註冊檢查
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body
  // 加入錯誤訊息提示
  let errors = []

  if (!name || !email || !password || !password2) {
    errors.push({ message: '所有欄位都是必填!' })
  }

  if (password !== password2) {
    errors.push({ message: '密碼輸入錯誤!' })
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    })
  } else {
    User.findOne({ where: { email: email } }).then(user => {
      if (user) {
        console.log('User already exists')
        res.render('register', {
          name,
          email,
          password,
          password2
        })
      } else {
        const newUser = new User({  //  如果 email 不存在就直接新增
          name,
          email,
          password,
        })
        bcryptjs.genSalt(10, (err, salt) => {
          bcryptjs.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash
            newUser
              .save()
              .then(user => {
                res.redirect('/')                   // 新增完成導回首頁
              })
              .catch(err => console.log(err))
          })
        })

      }
    })
  }

})
// 登出
router.get('/logout', (req, res) => {
  req.logout()
  // 加入訊息提示
  req.flash('success_msg', '你已經成功登出')
  res.redirect('/users/login')
})
module.exports = router