const express = require('express')
const routes = express.Router()
const multer = require('../app/middlewares/multer')

const Validator = require('../app/validators/chefs')
const ChefsController = require('../app/controllers/ChefsController')


routes.get('/chefs', ChefsController.index)
routes.get('/chefs/create', ChefsController.create)
routes.get('/chefs/:id', Validator.existence, ChefsController.show)
routes.get('/chefs/:id/edit', Validator.existence, ChefsController.edit)


routes.post('/chefs', multer.single('photo'), Validator.input, ChefsController.post)
routes.put('/chefs', multer.single('photo'), Validator.input, ChefsController.put)
routes.delete('/chefs', ChefsController.delete)



module.exports = routes