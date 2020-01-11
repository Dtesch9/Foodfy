const express = require('express')
const routes = express.Router()
const multer = require('../app/middlewares/multer')

const RecipesController = require('../app/controllers/RecipesController')

const Validator = require('../app/validators/recipes')


routes.get('/recipes', RecipesController.index) 
routes.get('/recipes/create', Validator.input, RecipesController.create) 
routes.get('/recipes/:id', Validator.existence, RecipesController.show) 
routes.get('/recipes/:id/edit', Validator.existence, RecipesController.edit) 

routes.post('/recipes', multer.array('images', 5), Validator.input, RecipesController.post) 
routes.put('/recipes', multer.array('images', 5), Validator.input, RecipesController.put) 
routes.delete('/recipes', RecipesController.delete) 


module.exports = routes