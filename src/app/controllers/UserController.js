const User = require('../models/User')

const crypto = require('crypto')
const { hash } = require('bcryptjs')

module.exports = {
  register(req, res) {
    return res.render('admin/users/register')
  },
  async post(req, res) {
    try {
      const { user } = req

      const { name, email, is_admin } = user

      const password = crypto.randomBytes(2).toString('hex')
      const passwordHash = await hash(password, 8)

      const userId = await User.create({
        name,
        email,
        password,
        is_admin
      })

      req.session.userId = userId

      return res.render('admin/users/register', {
        success: 'Usuário Cadastrado com sucesso!'
      })
    } catch (error) {
      console.error(error)
      
      res.render('admin/users/register', {
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
      const user = await User.findOne({
        where: {
          id: req.params.id
        }
      })

      return res.render(`admin/users/edit`, { user })
    } catch (error) {
      console.error(error)
    }
  }
}