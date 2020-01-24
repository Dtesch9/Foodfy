const User = require('../models/User')

const { compare } = require('bcryptjs')

function checkAllfields(body) {
  const keys = Object.keys(body)

  for (let key of keys) {
    if (body[key] == "") return true
  }
}

module.exports = {
  async login(req, res, next) {
    try {
      const emptyField = checkAllfields(req.body)

      if (emptyField) return res.render('admin/session/login', {
        user: req.body,
        warning: 'Por Favor, preencha todos os campos'
      })


      const { email, password } = req.body

      const user = await User.findOne({ where: {email} })

      if (!user) return res.render('admin/session/login', {
        user: req.body,
        error: 'Usuário Não cadastrado'
      })


      const granted = compare(password, user.password)

      if (password != user.password) return res.render('admin/session/login', {
        user: req.body,
        error: 'Senha incorreta!'
      })


      req.user = user

      next()
    } catch (error) {
      console.error(error);

      return res.render('admin/session/login', {
        user: req.body,
        error: 'Erro inesperado, tente novamente'
      })
    }
  },
  async forgot(req, res, next) {
   try {
     const emptyField = checkAllfields(req.body)

     if (emptyField) return res.render('admin/session/forgot-password', {
       user: req.body,
       warning: 'Por Favor, preencha todos os campos'
     })


     const emailVerified = await User.findOne({ where: { email: req.body.email } })

     if (!emailVerified) return res.render('admin/session/forgot-password', {
       user: req.body,
       error: 'Email Não cadastrado!'
     })

     req.user = emailVerified

     next()
   } catch (error) {
     console.error(error)

     return res.render('admin/session/forgot-password', {
       user: req.body,
       error: 'Erro inesperado, tente novamente'
     })
   }
  }
}