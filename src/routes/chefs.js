const express = require('express')
const routes = express.Router()
const multer = require('../app/middlewares/multer')

const { onlyUsers, onlyAdmins } = require('../app/middlewares/access')

const ChefValidator = require('../app/validators/chefs')
const ChefsController = require('../app/controllers/ChefsController')


routes.get('/chefs', onlyUsers, ChefsController.index)
routes.get('/chefs/create', onlyAdmins, ChefsController.create)
routes.get('/chefs/:id', onlyUsers, ChefValidator.existence, ChefsController.show)
routes.get('/chefs/:id/edit', onlyAdmins, ChefValidator.existence, ChefsController.edit)


routes.post('/chefs', multer.single('photo'), ChefValidator.post, ChefsController.post)
routes.put('/chefs', multer.single('photo'), ChefValidator.put, ChefsController.put)
routes.delete('/chefs', ChefsController.delete)



module.exports = routes