const Recipes = require('../models/Recipes')

module.exports = {
  async index(req, res) {
    const recipes = await Recipes.all()

    res.render('admin/recipes/index', { recipes })
  },
  async create(req, res) {
    const options = await Recipes.recipeSelectOptions()

    return res.render('admin/recipes/create', { options })
  },
  async post(req, res, next) { 
    try {
      const recipeId = await Recipes.create(req.body)

      return res.redirect(`/admin/recipes/${recipeId}`)
      
    } catch (error) {
      console.error(error)
    }  
  },
  async show(req, res) {
    try {
      const { recipe } = req

      return res.render('admin/recipes/show', { item: recipe })
    } catch (error) {
      console.log(error)
    }
  },
  async edit(req, res) {
    try {
      const { recipe } = req

      const options = await Recipes.recipeSelectOptions()

      return res.render('admin/recipes/edit', { recipe, options })
    } catch (error) {
      console.error(error)
    }
  },
  async put(req, res) {
    try {
      await Recipes.update(req.body)

      return res.redirect(`/admin/recipes/${req.body.id}`) 

    } catch (error) {
      console.log(error)
    }
  },
  async delete(req, res) {
    try {
      await Recipes.delete(req.body.id)

      return res.redirect('/admin/recipes')
    } catch (error) {
      console.error(error)
    }
  }
} 