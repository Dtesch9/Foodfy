const User = require('../models/User')

const crypto = require('crypto')
const mailer = require('../../lib/mailer')


const email = (name, token) => `
  <html>
  <head>
  <title>Page Title</title>
  <style>
  body {
    height: 100vh;
    background-color: rgba(0, 0, 0, .9);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    font-family: sans-serif;
  }

  h1 {
    color: rgb(4, 211, 97);
      font-size: 36px;
      font-weight: normal;
  }

  p {
    font-weight: bold;
    font-size: 18px;
    color: #F7DF1E;
    letter-spacing: 1px;
  }

  a {
    margin-top: 100px;
      text-decoration: none;
      background-color: #6558C3;
      border-radius: 4px;
      padding: 8px 32px;
      cursor: pointer;
      font-weight: bold;
      font-size: 16px;
      color: #ffffff;
      text-align: center;
  }

  a:hover {
    background:none;
      border: 2px solid #6558C3;
  }
  </style>
  </head>
  <body>

  <h1>Olá ${name}</h1>
  <p>Tenha mais cuidado com sua senha</p>
  <p>Vamos proporcionar uma nova para o senhor</p>

  <a href="http://localhost:3000/admin/password-reset?token=${token}" target="_blank">Nova Senha</a>

  </body>
  </html>

`


module.exports = {
  loginForm(req, res) {
    return res.render('admin/session/login')
  },
  login(req, res) {
    req.session.userId = req.user.id

    return res.render('admin/users/index', {
      user: req.user,
      success: `Bem vindo ${req.user.name}`
    })
  },
  logout(req, res) {
    req.session.destroy()
    return res.redirect('/admin/users')
  },
  forgotForm(req, res) {
    return res.render('admin/session/forgot-password')
  },
  async forgot(req, res) {
   try {
    const { user } = req
    // um token para esse Usuário
    const token = crypto.randomBytes(20).toString('hex')

    // criar uma expiração
    let expireTime = new Date()
    expireTime = expireTime.setHours(expireTime.getHours() + 1)

    await User.update(user.id, {
      reset_token: token,
      reset_token_expires: expireTime
    })

    // eviar um email com um link de recuperação de senha
    await mailer.sendMail({
      to: user.email,
      from: 'no-replay@foodfy.com.br',
      subject: 'Recuperação de senha',
      html: email(user.name, token)
    })

    // avisar o usuário que enviamos o email
    return res.render('admin/session/forgot-password', {
      user: req.body,
      success: 'Verifique seu Email'
    })
   } catch (error) {
     console.error(error)
     return res.render('admin/session/forgot-password', {
       user: req.body,
       error: 'Erro inesperado, tente novamente'
     })
   }
  },
  resetForm(req, res) {
    return res.render('admin/session/reset-form')
  }
}