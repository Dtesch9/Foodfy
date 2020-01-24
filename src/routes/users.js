const { Router } = require('express')
const routes = Router()


const { onlyUsers, notLogged } = require('../app/middlewares/access')

const UserValidator = require('../app/validators/user')
const ProfileValidator = require('../app/validators/profile')
const SessionValidator = require('../app/validators/session')

const SessionController = require('../app/controllers/SessionController')
const UserController = require('../app/controllers/UserController')
const ProfileController = require('../app/controllers/ProfileController')


// login/logout
routes.get('/login', notLogged, SessionController.loginForm)
  .post('/login', SessionValidator.login, SessionController.login)
  .post('/logout', SessionController.logout)


  // reset password / forgot
routes.get('/forgot-password', notLogged, SessionController.forgotForm)
  .get('/password-reset', SessionController.resetForm)
  .post('/forgot-password', SessionValidator.forgot, SessionController.forgot)
  .post('/password-reset', SessionValidator.reset, SessionController.reset)



// Rotas de perfil de um usuário logado
routes.get('/profile', onlyUsers, ProfileValidator.index, ProfileController.index) // Mostrar o formulário com dados do usuário logado
routes.put('/profile', onlyUsers, ProfileValidator.put, ProfileController.put)// Editar o usuário logado


// User register
routes.get('/users/register', UserController.register)
  .get('/users/edit/:id', UserController.edit)

// Rotas que o administrador irá acessar para gerenciar usuários
routes.get('/users/', UserController.list) //Mostrar a lista de usuários cadastrados
routes.post('/users/', UserValidator.post, UserController.post) //Cadastrar um usuário
// routes.put('/users/', UserController.put) // Editar um usuário
// routes.delete('/users/', UserController.delete) // Deletar um usuário


module.exports = routes