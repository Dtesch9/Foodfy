const faker = require('faker')

const Chefs = require('./src/app/models/Chefs')
const Recipes = require('./src/app/models/Recipes')

const { date } = require('./src/lib/utility')
const data = require('./data.json')

let recipesIds = []
let totalChefs = 5
let chefsIds = []

function createArray(items) {
  let array = []

  for (let item of items) {
    array.push(item)
  }
  return array
}

async function createChefs() {
  const chefs = []

  while (chefs.length < totalChefs) {
    chefs.push({
      name: faker.name.findName(),
      avatar_url: 'https://source.unsplash.com/collection/1496317/random',
      created_at: date(Date.now()).iso
    })
  }

  const chefsPromise = chefs.map(chef => Chefs.create(chef))

  chefsIds = await Promise.all(chefsPromise)
}

async function createRecipes() {
  let recipes = []

  for (let recipe of data.recipes) {
    recipes.push({
      chef_id: chefsIds[Math.floor(Math.random() * 3)],
      image: recipe.image,
      title: recipe.title,
      ingredients: createArray(recipe.ingredients),
      preparation: createArray(recipe.preparation),
      information: recipe.information,
      created_at: date(Date.now()).iso
    })
  }

  const recipesPromise = recipes.map(recipe => Recipes.create(recipe))

  recipesIds = await Promise.all(recipesPromise)
}


async function init() {
  await createChefs()
  await createRecipes()
}

init()