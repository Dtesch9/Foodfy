const { Router } = require('express')
const routes = Router()

const UserValidator = require('../app/validators/user')
const ProfileValidator = require('../app/validators/profile')

const SessionController = require('../app/controllers/SessionController')
const UserController = require('../app/controllers/UserController')
const ProfileController = require('../app/controllers/ProfileController')


// login/logout
// routes.get('/login', SessionController.loginForm)
//   .post('/login', SessionController.login)
//   .post('/logout', SessionController.logout)


  // reset password / forgot
// routes.get('/forgot-password', SessionController.forgotForm)
//   .get('/password-reset', SessionController.resetForm)
//   .post('/forgot-password', SessionController.forgot)
//   .post('/password-reset', SessionController.reset)



// Rotas de perfil de um usuário logado
routes.get('/profile', ProfileValidator.index, ProfileController.index) // Mostrar o formulário com dados do usuário logado
routes.put('/profile', ProfileValidator.put, ProfileController.put)// Editar o usuário logado


// User register
routes.get('/register', UserController.register)
  .get('/edit/:id', UserController.edit)

// Rotas que o administrador irá acessar para gerenciar usuários
routes.get('/', UserController.list) //Mostrar a lista de usuários cadastrados
routes.post('/', UserValidator.post, UserController.post) //Cadastrar um usuário
// routes.put('/', UserController.put) // Editar um usuário
// routes.delete('/', UserController.delete) // Deletar um usuário


module.exports = routes