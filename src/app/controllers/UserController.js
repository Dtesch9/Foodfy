const User = require('../models/User')

const crypto = require('crypto')
const { hash } = require('bcryptjs')
const mailer = require('../../lib/mailer')


const passwordEmail = (name, email, password) => `
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

  p:first-child {
    text-transform: uppercase;
  }

  a {
    margin-top: 100px;
      text-decoration: none;
      background-color: #6558C3;
      border: 2px solid #6558C3;
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
  <p>Seus dados:</p>
  <p>Email: ${email}</p>
  <p>Senha: ${password}</p>

  <a href="http://localhost:3000/admin/profile" target="_blank">Minha Conta</a>

  </body>
  </html>
`


module.exports = {
  create(req, res) {
    return res.render('admin/users/create')
  },
  async post(req, res) {
    try {
      const { name, email, is_admin } = req.user

      const password = crypto.randomBytes(2).toString('hex')
      const passwordHash = await hash(password, 8)

      const userId = await User.create({
        name,
        email,
        password: passwordHash,
        is_admin
      })

      await mailer.sendMail({
        to: email,
        from: 'no-replay@foodfy.com.br',
        subject: 'Sua senha de usuário',
        html: passwordEmail(name, email, password)
      })


      req.session.userId = userId

      return res.render('admin/users/register', {
        success: 'Sucesso! Senha no seu Email'
      })
    } catch (error) {
      console.error(error)
      
      return res.render('admin/users/register', {
        user: newUser,
        error: 'Erro inesperado, tente novamente'
      })
    }
  },
  async list(req, res) {
    try {
      const users = await User.findAll(null, 'updated_at')
      
      return res.render('admin/users/list', { users })
    } catch (error) {
      console.error(error)

      res.render('admin/users/list', {
        users,
        error: 'Erro inesperado, Tente novamente'
      })
    }
  },
  async edit(req, res) {
    try {
      const { user } = req

      return res.render(`admin/users/edit`, { user })
    } catch (error) {
      console.error(error)
    }
  },
  async put(req, res) {
    try {
      const { id, name, email, is_admin } = req.user

      await User.update(id, {
        name,
        email,
        is_admin
      })

      return res.render('admin/users/edit', {
        user: req.user,
        success: 'Conta atualizada com Sucesso!'
      })
    } catch (error) {
      console.error(error)

      return res.render(`admin/users/edit`, {
        error: 'Erro inesperado! Tente novamente!'
      })
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.body

      await User.delete(id)

      return res.redirect('/admin/users')
    } catch (error) {
      console.log(error)

      return res.render('admin/users/edit', {
        user,
        error: 'Erro inesperado! Tente novamente'
      })
    }
  }
}