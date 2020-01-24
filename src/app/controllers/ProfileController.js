const User = require('../models/User')

module.exports = {
  async index(req, res) {
   try {
     const { user } = req
     
     return res.render('admin/users/index', {
       user
     })
   } catch (error) {
     console.error(error)
   }
  },
  async put(req, res) {
   try {
     const { userId: id } = req.session
     const { name, email } = req.user

     await User.update(id, {
      name,
      email
     })

     return res.render('admin/users/index', {
       user: req.user,
       success: 'Conta atualizada com Sucesso!'
     })

   } catch (error) {
     console.error(error)
     return res.render('admin/users/index', {
       error: 'Erro inesperado, tente novamente'
     })
   }
  }
}