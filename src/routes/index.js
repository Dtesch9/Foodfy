const express = require('express')
const routes = express.Router()

const foodfy = require('../routes/foodfy')
const admin = require('../routes/recipes')
const chefs = require('../routes/chefs')
const users = require('../routes/users')


routes.get('/', (req, res) => res.redirect('/foodfy'))

routes.use('/foodfy', foodfy)
routes.use('/admin', admin, chefs, users)

// Alias
routes.get('/admin', (req, res) => res.redirect('/admin/recipes'))
  .get('/recipes', (req, res) => res.redirect('/admin/recipes'))
  .get('/chefs', (req, res) => res.redirect('/admin/chefs'))


module.exports = routes