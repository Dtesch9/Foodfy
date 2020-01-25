const { Router } = require('express')
const routes = Router()


const { onlyUsers, onlyAdmins, loggedRedirectToProfile } = require('../app/middlewares/access')

const UserValidator = require('../app/validators/user')
const ProfileValidator = require('../app/validators/profile')
const SessionValidator = require('../app/validators/session')

const SessionController = require('../app/controllers/SessionController')
const UserController = require('../app/controllers/UserController')
const ProfileController = require('../app/controllers/ProfileController')


// login/logout
routes.get('/login', loggedRedirectToProfile, SessionController.loginForm)
  .post('/login', SessionValidator.login, SessionController.login)
  .post('/logout', SessionController.logout)


  // reset password / forgot
routes.get('/forgot-password', loggedRedirectToProfile, SessionController.forgotForm)
  .get('/password-reset', loggedRedirectToProfile, SessionController.resetForm)
  .post('/forgot-password', SessionValidator.forgot, SessionController.forgot)
  .post('/password-reset', SessionValidator.reset, SessionController.reset)



// Rotas de perfil de um usuário logado
routes.get('/profile', onlyUsers, ProfileValidator.index, ProfileController.index) // Mostrar o formulário com dados do usuário logado
  .put('/profile', onlyUsers, ProfileValidator.put, ProfileController.put)// Editar o usuário logado



// Rotas que o administrador irá acessar para gerenciar usuários //
routes.get('/users/create',onlyUsers, onlyAdmins, UserController.create)
  .get('/users/edit/:id',onlyUsers, onlyAdmins, UserValidator.edit, UserController.edit)
  .get('/users',onlyUsers, onlyAdmins, UserController.list) //Mostrar a lista de usuários cadastrados


routes.post('/users',onlyUsers, onlyAdmins, UserValidator.post, UserController.post) //Cadastrar um usuário
  .put('/users/',onlyUsers, onlyAdmins, UserValidator.put, UserController.put) // Editar um usuário
  .delete('/users/',onlyUsers, onlyAdmins, UserValidator.delete, UserController.delete) // Deletar um usuário


module.exports = routes