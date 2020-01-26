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

  // Password change
  .get('/password-change', onlyUsers, SessionController.passwordChangeForm).post('/password-change', onlyUsers, SessionValidator.passwordChange, SessionController.passwordChange)



// Rotas de perfil de um usuário logado
routes.get('/profile', onlyUsers, ProfileValidator.index, ProfileController.index) 
  .put('/profile', onlyUsers, ProfileValidator.put, ProfileController.put)


// Rotas que o administrador irá acessar para gerenciar usuários //
routes.get('/users/create',onlyUsers, onlyAdmins, UserController.create)
  .get('/users/:id/edit',onlyUsers, onlyAdmins, UserValidator.edit, UserController.edit)
  .get('/users',onlyUsers, onlyAdmins, UserController.list) 


routes.post('/users', UserValidator.post, UserController.post) 
  .put('/users/', UserValidator.put, UserController.put) 
  .delete('/users/', UserValidator.delete, UserController.delete)


module.exports = routes