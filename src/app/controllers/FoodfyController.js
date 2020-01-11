const Foodfy = require('../models/Foodfy')
const Recipes = require('../models/Recipes')

module.exports = {
  async index(req, res) {
    try {
      const { filter } = req.query
      
      if (filter) {
        const recipes = await Foodfy.findBy(filter)

        return res.render('home/foodfy/filteredIndex', { items: recipes, filter })
      } else {
        const recipes = await Recipes.all()

        return res.render('home/foodfy/index', { items: recipes })
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
      const recipes = await Recipes.all()

      return res.render('home/foodfy/recipes', { items: recipes })
    } catch (error) {
      console.error(error)
    }
  },
  async info(req, res) {
    try {
      const recipe = await Recipes.find(req.params.id)

      return res.render('home/foodfy/recipe-info', { item: recipe }) 
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