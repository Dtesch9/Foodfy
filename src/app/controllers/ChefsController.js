const Chefs = require('../models/Chefs')
const File = require('../models/File')
const LoadChefService = require('../services/LoadChefService')
const LoadRecipeService = require('../services/LoadRecipeServices')


module.exports = {
  async index(req, res) {
    try {
      const chefs = await LoadChefService.load('chefs')

      return res.render('admin/chefs/index', { chefs })
    } catch (error) {
      console.error(error)
    }
  },
  create(req, res) {
    try {
      return res.render('admin/chefs/create')
    } catch (error) {
      console.error(error)
    }
  },
  async show(req, res) {
    try {
      const { chefId } = req

      const chef = await LoadChefService.load('chef', chefId)
      
      const recipes = await LoadRecipeService.load('chefRecipes', chefId)

      return res.render('admin/chefs/show', { recipes, chef })
    } catch (error) {
      console.error(error)
    }
  },
  async post(req, res) {
    try {
      const { filename: name, path } = req.file

      File.init({ table: 'files' })
      const fileId = await File.create({
        name,
        path
      })

      req.body.fileId = fileId

      const chefId = await Chefs.create(req.body)
      
      return res.redirect(`/admin/chefs/${chefId}`)
    } catch (error) {
      console.error(error)
    }
  },
  async edit(req, res) {
    try {
      const results = await LoadChefService.load('chef', req.chefId) 

      const chef = {
        ...results,
        src: `${req.protocol}://${req.headers.host}${results.image.replace('public', '')}`
      }
      
      return res.render('admin/chefs/edit', { chef })
    } catch (error) {
      console.error(error)
    }
  },
  async put(req, res) {
    try {
      if (req.body.removed_photo) {
        const id = req.body.removed_photo
        await File.delete(id)
      }

      File.init({ table: 'files' })
      const fileId = await File.create({
        name,
        path
      })

      req.body.fileId = fileId
      
      await Chefs.update(req.body)

      return res.redirect(`/admin/chefs/${req.body.id}`)
    } catch (error) {
      console.error(error)
    }
  },
  async delete(req, res) {
    try {
      await Chefs.delete(req.body.id)
      
      await File.deleteSingle(req.body.file_id)

      return res.redirect('/admin/chefs')
    } catch (error) {
      console.error(error)
    }
  }   
}