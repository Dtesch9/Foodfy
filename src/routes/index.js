const express = require('express')
const routes = express.Router()

const foodfy = require('../routes/foodfy')
const recipes = require('../routes/recipes')
const chefs = require('../routes/chefs')
const users = require('../routes/users')


routes.get('/', (req, res) => res.redirect('/foodfy'))

routes.use('/foodfy', foodfy)
  .use('/admin', recipes, chefs, users)

  
// Alias
routes.get('/admin', (req, res) => res.redirect('/admin/recipes'))
  .get('/recipes', (req, res) => res.redirect('/admin/recipes'))
  .get('/chefs', (req, res) => res.redirect('/admin/chefs'))
  .get('/users', (req, res) => res.redirect('/admin/users'))


module.exports = routes