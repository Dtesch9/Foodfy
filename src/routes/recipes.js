const express = require('express')
const routes = express.Router()
const multer = require('../app/middlewares/multer')

const RecipesController = require('../app/controllers/RecipesController')

const RecipeValidator = require('../app/validators/recipes')

const { onlyUsers, onlyAdmins } = require('../app/middlewares/access')


routes.get('/recipes', onlyUsers, RecipesController.index) 
routes.get('/recipes/create', onlyUsers, RecipeValidator.create, RecipesController.create) 
routes.get('/recipes/:id', onlyUsers, RecipeValidator.bothShowAndEdit, RecipesController.show) 
routes.get('/recipes/:id/edit', onlyAdmins, RecipeValidator.bothShowAndEdit, RecipesController.edit) 

routes.post('/recipes', multer.array('images', 5), RecipeValidator.post, RecipesController.post) 
routes.put('/recipes', multer.array('images', 5), RecipeValidator.put, RecipesController.put) 
routes.delete('/recipes', RecipesController.delete)


module.exports = routes