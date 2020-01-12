const Recipes = require('../models/Recipes')

async function input(req, res, next) {
  const keys = Object.keys(req.body)

  for (let key of keys) {
    if (req.body[key] == "" && key != "removed_files") return res.send('Please fulfill all fields!')
  }

  next()
}

async function existence(req, res, next) {
  const { id } = req.params

  const recipe = await Recipes.find(id)

  if (!recipe) return res.send('Error 404 not found!')

  req.recipe = recipe

  next()
}

module.exports = {
  input,
  existence
}