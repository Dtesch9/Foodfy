const Foodfy = require('../models/Foodfy')
const Recipes = require('../models/Recipes')
const LoadRecipeService = require('../services/LoadRecipeServices')

module.exports = {
  async index(req, res) {
    try {
      const { filter } = req.query
      
      if (filter) {
        const recipes = await LoadRecipeService.load('findBy', filter)

        return res.render('home/foodfy/filteredIndex', { recipes, filter })
      } else {

        const recipes = await LoadRecipeService.load('recipes')

        return res.render('home/foodfy/index', { recipes })
      }

    } catch (error) {
      console.error(error)
    }
  },
  about(req, res) {
    res.render('home/foodfy/about')
  },
  async recipes(req, res) {
    try {
      const recipes = await LoadRecipeService.load('recipes')

      return res.render('home/foodfy/recipes', { recipes })
    } catch (error) {
      console.error(error)
    }
  },
  async info(req, res) {
    try {
      const recipe = await LoadRecipeService.load('recipe', req.params.id)

      return res.render('home/foodfy/recipe-info', { recipe }) 
    } catch (error) {
      console.error(error)
    }
  },
  async chefs(req, res) {
    try {
      const chefs = await Foodfy.chefs()

      return res.render('home/foodfy/chefs', { chefs })
    } catch (error) {
      console.error(error)
    }
  }
}