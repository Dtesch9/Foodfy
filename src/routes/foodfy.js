const express = require('express')
const routes = express.Router()

const FoodfyController = require('../app/controllers/FoodfyController')

routes.get('/', FoodfyController.index)
routes.get('/about', FoodfyController.about)
routes.get('/recipes', FoodfyController.recipes)
routes.get('/recipes/:id',FoodfyController.info)
routes.get('/chefs', FoodfyController.chefs)


module.exports = routes