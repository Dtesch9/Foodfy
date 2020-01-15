const faker = require('faker')

const db = require('./src/config/db')

const Chefs = require('./src/app/models/Chefs')
const Recipes = require('./src/app/models/Recipes')
const File = require('./src/app/models/File')

const { date } = require('./src/lib/utility')

let recipesIds = []
let totalChefs = 8
let chefsIds = []
let totalRecipes = 8
let filesIds = []

async function cleanDb() {
  await db.query(`
    DELETE FROM recipe_files;
    DELETE FROM chefs;
    DELETE FROM files;
    DELETE FROM recipes;

    ALTER SEQUENCE chefs_id_seq RESTART WITH 1;
    ALTER SEQUENCE recipes_id_seq RESTART WITH 1;
    ALTER SEQUENCE recipe_files_id_seq RESTART WITH 1;
    ALTER SEQUENCE files_id_seq RESTART WITH 1;
  `)
}

function createArray() {
  return new Array(5).fill(null)
    .map(() => faker.fake("{{name.lastName}}, {{name.firstName}}, {{name.suffix}}"))
} 
    
async function createChefs() {
  const chefs = []
  const files = []

  while (files.length < totalChefs) {
    files.push({
      name: `${Date.now()}-${faker.image.image()}`,
      path: `public/images/${files.length + 1}-placeholder.png`
    })
  }

  File.init({ table: 'files' })
  const filesPromise = files.map(file => File.create(file))

  const chefsPhotosIds = await Promise.all(filesPromise)


  while (chefs.length < totalChefs) {
    chefs.push({
      name: faker.name.findName(),
      fileId: chefsPhotosIds[chefs.length],
      created_at: date(Date.now()).iso
    })
  }

  const chefsPromise = chefs.map(chef => Chefs.create(chef))

  chefsIds = await Promise.all(chefsPromise)
}

async function createRecipes() {
  const recipes = []

  while (recipes.length < totalRecipes) {
    recipes.push({
      chef_id: chefsIds[Math.floor(Math.random() * 3)],
      title: faker.name.title(),
      ingredients: createArray(),
      preparation: createArray(),
      information: faker.lorem.paragraph(Math.ceil(Math.random() * 10)),
      created_at: date(Date.now()).iso
    })
  }

  const recipesPromise = recipes.map(recipe => Recipes.create(recipe))
  recipesIds = await Promise.all(recipesPromise)
}

async function createFiles() {
  const files = []

  while (files.length < 15) {
    files.push({
      name: `${Date.now()}-${faker.image.image()}`,
      path: `public/images/placeholder-${files.length + 1}.png`
    })
  }

  File.init({ table: 'files' })
  const filesPromise = files.map(file => File.create(file))

  filesIds = await Promise.all(filesPromise)


  File.init({ table: 'recipe_files' })
  const relationPromise = filesIds.map(id => File.create({
    recipe_id: recipesIds[Math.floor(Math.random() * totalRecipes)],
    file_id: id
  }))

  await Promise.all(relationPromise)
}



async function init() {
  await cleanDb()
  await createChefs()
  await createRecipes()
  await createFiles()

  console.log('Done!')
}

init()