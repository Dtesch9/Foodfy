const User = require('../models/User')

const crypto = require('crypto')

module.exports = {
  register(req, res) {
    return res.render('admin/users/register')
  },
  async post(req, res) {
    try {
      const { user } = req

      const { name, email, is_admin } = user

      const userId = await User.create({
        name,
        email,
        password: crypto.randomBytes(2).toString('hex'),
        is_admin
      })

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