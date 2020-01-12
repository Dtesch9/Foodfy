const Recipes = require('../models/Recipes')
const File = require('../models/File')


module.exports = {
  async index(req, res) {
    let recipes = await Recipes.all()

    async function getImages(recipeId) {
      const results = await Recipes.files(recipeId)

      const files = results.map(file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`)

      return files[0]
    }


    const recipesPromise = recipes.map(async recipe => {
      recipe.image = await getImages(recipe.id)

      return recipe
    })

    recipes = await Promise.all(recipesPromise)


    res.render('admin/recipes/index', { recipes })
  },
  async create(req, res) {
    const options = await Recipes.recipeSelectOptions()

    return res.render('admin/recipes/create', { options })
  },
  async post(req, res) { 
    try {
      if (req.files.length == 0)  return res.send('please, send at least one image')

      File.init({ table: 'files' })
      const filesPromise = req.files.map(file => File.create({
          name: file.filename,
          path: file.path
      }))

      const filesIds = await Promise.all(filesPromise)


      const recipeId = await Recipes.create(req.body)
      

      File.init({ table: 'recipe_files'})
      const relationPromise = filesIds.map(id => File.create({
        recipe_id: recipeId,
        file_id: id
      }))

      await Promise.all(relationPromise)


      return res.redirect(`/admin/recipes/${recipeId}`)
      
    } catch (error) {
      console.error(error)
    }  
  },
  async show(req, res) {
    try {
      const { recipe } = req

      async function getImages(recipeId) {
        const results = await Recipes.files(recipeId)

        const files = results.map(file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`)

        return files[0]
      }

      recipe.image = await getImages(recipe.id)

      return res.render('admin/recipes/show', { item: recipe })
    } catch (error) {
      console.log(error)
    }
  },
  async edit(req, res) {
    try {
      const { recipe } = req

      const options = await Recipes.recipeSelectOptions()

      let files = await Recipes.files(recipe.id)

      
      files = files.map(file => ({
        ...file,
        src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}` 
      }))


      return res.render('admin/recipes/edit', { recipe, options, files })
    } catch (error) {
      console.error(error)
    }
  },
  async put(req, res) {
    try {
      if (req.files.length != 0) {
        File.init({ table: 'files' })
        const filesPromise = req.files.map(file => File.create({
          name: file.filename,
          path: file.path
        }))

        const filesIds = await Promise.all(filesPromise)


        File.init({ table: 'recipe_files' })
        const relationPromise = filesIds.map(id => File.create({
          recipe_id: req.body.id,
          file_id: id
        }))

        await Promise.all(relationPromise)
      }
      


      if (req.body.removed_files) {
        const removedFiles = req.body.removed_files.split(',')
        removedFiles.splice(-1,1)

        const removedFilesPromise = removedFiles.map(id => File.delete(id))

        await Promise.all(removedFilesPromise)
      }


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