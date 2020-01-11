const express = require('express')
const routes = express.Router()

const RecipesController = require('../app/controllers/RecipesController')

const Validator = require('../app/validators/recipes')


routes.get('/recipes', RecipesController.index) 
routes.get('/recipes/create', Validator.input, RecipesController.create) 
routes.get('/recipes/:id', Validator.existence, RecipesController.show) 
routes.get('/recipes/:id/edit', Validator.existence, RecipesController.edit) 

routes.post('/recipes', Validator.input, RecipesController.post) 
routes.put('/recipes', Validator.input, RecipesController.put) 
routes.delete('/recipes', RecipesController.delete) 


module.exports = routes