const express = require('express')
const routes = express.Router()
const multer = require('../app/middlewares/multer')

const { onlyUsers, onlyAdmins } = require('../app/middlewares/access')

const Validator = require('../app/validators/chefs')
const ChefsController = require('../app/controllers/ChefsController')


routes.get('/chefs', onlyUsers, ChefsController.index)
routes.get('/chefs/create', onlyAdmins, onlyUsers, ChefsController.create)
routes.get('/chefs/:id', onlyUsers, Validator.existence, ChefsController.show)
routes.get('/chefs/:id/edit', onlyAdmins, onlyUsers, Validator.existence, ChefsController.edit)


routes.post('/chefs', multer.single('photo'), Validator.input, ChefsController.post)
routes.put('/chefs', multer.single('photo'), Validator.input, ChefsController.put)
routes.delete('/chefs', ChefsController.delete)



module.exports = routes