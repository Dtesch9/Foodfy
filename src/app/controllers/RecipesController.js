const Recipes = require('../models/Recipes')
const File = require('../models/File')
const LoadRecipeService = require('../services/LoadRecipeServices')


module.exports = {
  async index(req, res) {
    const recipes = await LoadRecipeService.load('recipes')

    res.render('admin/recipes/index', { recipes })
  },
  async create(req, res) {
    const options = await Recipes.recipeSelectOptions()

    return res.render('admin/recipes/create', { options })
  },
  async post(req, res) { 
    try {
      if (req.files.length == 0)  return res.send('please, send at least one image')

      File.create({ table: 'files' })
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
      const recipe = await LoadRecipeService.load('recipe', req.recipeId)

      return res.render('admin/recipes/show', { recipe })
    } catch (error) {
      console.log(error)
    }
  },
  async edit(req, res) {
    try {
      const recipe = await LoadRecipeService.load('recipe', req.recipeId)

      const options = await Recipes.recipeSelectOptions()

      return res.render('admin/recipes/edit', { recipe, options })
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
      const { recipeId } = req

      const files = await LoadRecipeService.load('recipe', recipeId)

      const deletedFilesPromise = files.map(id => File.delete(id))

      await Promise.all(deletedFilesPromise)

      await Recipes.delete(recipeId)

      return res.redirect('/admin/recipes')
    } catch (error) {
      console.error(error)
    }
  }
} 