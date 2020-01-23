const User = require('../models/User')

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

      if (emptyField) return res.render('admin/users/register', {
        user: newUser,
        warning: 'Por Favor, preencha todos os campos'
      })


      const user = await User.findOne({
        where: {
          email: req.body.email
        }
      })

      if (user) return res.render('admin/users/register', {
        user: newUser,
        error: 'Usuário já cadastrado'
      })
      

      !newUser.is_admin ? newUser.is_admin = false : true

      req.user = newUser

      next()
    } catch (error) {
      console.error(error);

      res.render('admin/users/register', {
        user: newUser,
        error: 'Erro inesperado, tente novamente'
      })
    }
  }
}