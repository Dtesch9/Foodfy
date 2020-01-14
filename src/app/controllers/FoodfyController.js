const Foodfy = require('../models/Foodfy')
const LoadRecipeService = require('../services/LoadRecipeServices')
const LoadChefService = require('../services/LoadChefService')

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
      let chefs = await Foodfy.chefs()

      const chefsPromise = chefs.map(LoadChefService.format)

      chefs = await Promise.all(chefsPromise)


      return res.render('home/foodfy/chefs', { chefs })
    } catch (error) {
      console.error(error)
    }
  }
}