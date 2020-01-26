const LoadRecipeService = require('../services/LoadRecipeServices')
const PostFileServices = require('../services/PostFileServices')
const Recipes = require('../models/Recipes')
const File = require('../models/File')

const { filteredArray } = require('../../lib/utility')


module.exports = {
  async index(req, res) {
    const recipes = await LoadRecipeService.load('recipes')

    res.render('admin/recipes/index', { recipes })
  },
  async create(req, res) {
    const { options } = req

    return res.render('admin/recipes/create', { options })
  },
  async post(req, res) { 
    try {
      let { chef_id, title, ingredients, preparation, information } = req.body

      const { userId: loggedUserId } = req.session

      ingredients = filteredArray(ingredients)
      preparation = filteredArray(preparation)

      const recipeId = await Recipes.create({
        chef_id,
        title,
        ingredients,
        preparation,
        information,
        user_id: loggedUserId
      })
      
      await PostFileServices.post('files', req.files, recipeId)

      return res.redirect(`/admin/recipes/${recipeId}`)
      
    } catch (error) {
      console.error(error)
    }  
  },
  async show(req, res) {
    try {
      const recipe = await LoadRecipeService.load('recipe', req.params.id)

      return res.render('admin/recipes/show', { recipe })
    } catch (error) {
      console.log(error)

      return res.render('admin/recipes/show', {
        error: 'Erro inesperado! Tente novamente'
      })
    }
  },
  async edit(req, res) {
    try {
      const recipe = await LoadRecipeService.load('recipe', req.params.id)

      const options = await Recipes.recipeSelectOptions()

      return res.render('admin/recipes/edit', { recipe, options })
    } catch (error) {
      console.error(error)

      return res.render('admin/recipes/show', {
        error: 'Erro inesperado! Tente novamente'
      })
    }
  },
  async put(req, res) {
    try {
      if (req.files.length != 0) {
        await PostFileServices.post('files', req.files, req.body.id)
      }
      

      if (req.body.removed_files) {
        const removedFiles = req.body.removed_files.split(',')
        removedFiles.splice(-1,1)

        const removedFilesPromise = removedFiles.map(id => File.deleteMult(id))

        await Promise.all(removedFilesPromise)
      }


      let { chef_id, title, ingredients, preparation,
      information } = req.body

      ingredients = filteredArray(ingredients)
      preparation = filteredArray(preparation)

      await Recipes.update(req.body.id, {
        chef_id,
        title,
        ingredients,
        preparation,
        information
      })

      return res.redirect(`/admin/recipes/${req.body.id}`) 

    } catch (error) {
      console.log(error)
    }
  },
  async delete(req, res) {
    try {
      const recipeId = req.body.id

      const files = await Recipes.files(recipeId)
      
      const deletedFilesPromise = files.map(file => File.deleteMult(file.id))
      
      await Promise.all(deletedFilesPromise)
      
      await Recipes.delete(recipeId)

      return res.redirect('/admin/recipes')
    } catch (error) {
      console.error(error)
    }
  }
}