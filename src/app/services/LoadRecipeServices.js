const Recipes = require('../models/Recipes')
const Foodfy = require('../models/Foodfy')

async function format(recipe) {
  const files = await getImages(recipe.id)

  if (files[0]) {
    recipe.image = files[0].src
    recipe.files = files
    recipe.filename = files[0].name
  }

  return recipe
}


async function getImages(recipeId) {
  const results = await Recipes.files(recipeId)

  const files = results.map(file => ({
    ...file,
    src: `${file.path.replace('public', '')}`
  }))

  return files
}


const LoadService = {
  load(service, filter) {
    this.filter = filter

    return this[service](filter)
  },
  async recipe() {
    try {
      const recipe = await Recipes.findWithJoin(this.filter)

      return format(recipe)
    } catch (error) {
      console.error(error)
    }
  },
  async recipes() {
    try {
      const recipes = await Recipes.all()
      const recipesPromise = recipes.map(format)
      
      return Promise.all(recipesPromise)
    } catch (error) {
      console.error(error)
    }
  },
  async findBy() {
    try {
      const recipes = await Foodfy.findBy(this.filter)
      const recipesPromise = recipes.map(format)

      return Promise.all(recipesPromise)
    } catch (error) {
      console.error(error)
    }
  },
  async chefRecipes() {
    try {
      const results = await Recipes.findAll(this.filter)
      const recipesPromise = await results.map(format)
  
      return await Promise.all(recipesPromise)
    } catch (error) {
      console.error(error)
    }
  },
  format
}

module.exports = LoadService