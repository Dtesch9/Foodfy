const User = require('../models/User')

const { formatBoolean } = require('../../lib/utility')

function checkAllfields(body) {
  const keys = Object.keys(body)
  
  for (let key of keys) {
    if (body[key] == "") return true
  }
}

module.exports = {
  async post(req, res, next) {
    try {
      const newUser = req.body

      const emptyField = checkAllfields(newUser)

      if (emptyField) return res.render('admin/users/create', {
        user: newUser,
        warning: 'Por Favor, preencha todos os campos'
      })


      const user = await User.findOne({ where: {email: newUser.email} })

      if (user) return res.render('admin/users/create', {
        user: newUser,
        error: 'Usuário já cadastrado'
      })
      

      req.user = newUser
      
      req.user.is_admin = formatBoolean(newUser.is_admin)

      next()
    } catch (error) {
      console.error(error);

      return res.render('admin/users/create', {
        user: newUser,
        error: 'Erro inesperado, tente novamente'
      })
    }
  },
  async edit(req, res, next) {
    try {
      const { id } = req.params

      const user = await User.findOne({ where: { id } })

      if (!user) return res.render('admin/users/edit', {
        error: 'Usuário não encontrado!'
      })

      req.user = user

      next()
    } catch (error) {
      console.error(error)

      return res.render('admin/users/edit', {
        error: 'Erro inesperado! Tente novamente'
      })
    }
  },
  async put(req, res, next) {
    try {
      const { id, is_admin } = req.body

      const emptyField = checkAllfields(req.body)

      if (emptyField) return res.render('admin/users/edit', {
        user: req.body,
        warning: 'Por Favor, preencha todos os campos'
      })


      const user = await User.findOne({ where: { id } })

      if (!user) return res.render(`admin/users/edit`, {
        error: 'Usuário não encontrado!'
      })

      req.user = req.body
      
      req.user.is_admin = formatBoolean(is_admin)

      next()
    } catch (error) {
      console.error(error)
      return res.render(`admin/users/edit`, {
        error: 'Erro inesperado! Tente novamente!'
      })
    }
  },
  async delete(req, res, next) {
    try {
      const { userId: loggedUserId, is_admin } = req.session
      const { id: toBeDeletedId } = req.body

      // Verify if Session user is administrator
      if (is_admin == false) return res.render(`admin/users/edit`, {
        error: 'Apenas administrador pode deletar!'
      })


      const user = await User.findOne({ where: { id: toBeDeletedId } })

      if (!user) return res.render(`admin/users/edit`, {
        error: 'Usuário não encontrado!'
      })


      // if id == req.session.userId means he's trying to delete himself
      if (loggedUserId == toBeDeletedId) return res.render('admin/users/edit', {
        user,
        error: 'Voce não pode deletar sua própria conta!'
      })

      next()
    } catch (error) {
      console.error(error)

      return res.render('admin/users/edit', {
        user,
        error: 'Erro inesperado! Tente novamente'
      })
    }
  }
}