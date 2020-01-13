const Recipes = require('../models/Recipes')
const Foodfy = require('../models/Foodfy')

async function format(recipe) {
  const files = await getImages(recipe.id)

  recipe.image = files[0].src
  recipe.files = files
  recipe.filename = files[0].name

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
    const recipe = await Recipes.find(this.filter)
    return format(recipe)
  },
  async recipes() {
    const recipes = await Recipes.all()
    const recipesPromise = recipes.map(format)
    return Promise.all(recipesPromise)
  },
  async findBy() {
    const recipes = await Foodfy.findBy(this.filter)
    const recipesPromise = recipes.map(format)
    return Promise.all(recipesPromise)
  },
  format
}

module.exports = LoadService