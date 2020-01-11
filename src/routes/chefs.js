const express = require('express')
const routes = express.Router()

const Validator = require('../app/validators/chefs')
const ChefsController = require('../app/controllers/ChefsController')


routes.get('/chefs', ChefsController.index)
routes.get('/chefs/create', Validator.input, ChefsController.create)
routes.get('/chefs/:id', Validator.existence, ChefsController.show)
routes.get('/chefs/:id/edit', Validator.existence, ChefsController.edit)


routes.post('/chefs', Validator.input, ChefsController.post)
routes.put('/chefs', Validator.input, ChefsController.put)
routes.delete('/chefs', ChefsController.delete)



module.exports = routes