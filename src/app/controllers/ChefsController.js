const Chefs = require('../models/Chefs')
const File = require('../models/File')
const LoadChefService = require('../services/LoadChefService')
const LoadRecipeService = require('../services/LoadRecipeServices')
const PostFileServices = require('../services/PostFileServices')

const { date } = require('../../lib/utility')


module.exports = {
  async index(req, res) {
    try {
      const chefs = await LoadChefService.load('chefs', 'updated_at')

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
      
      const recipes = await LoadRecipeService.load('chefRecipes', { 
        where: { 
          chef_id: chefId 
        } })

      return res.render('admin/chefs/show', { recipes, chef })
    } catch (error) {
      console.error(error)
    }
  },
  async post(req, res) {
    try {
      if (!req.file) return res.send('Send at least one photo!')

      const fileId = await PostFileServices.createFile(req.file)

      const chefId = await Chefs.create({
        name: req.body.name,
        file_id: fileId,
        created_at: date(Date.now()).iso
      })
      
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
      const { id: chefId, file_id, name } = req.body

      if (req.body.removed_photo) {       
        const fileId = await PostFileServices.createFile(req.file)
        
        await Chefs.update(chefId, {
          name,
          file_id: fileId,
        })

        const deletedFileId = req.body.removed_photo
        await File.deleteSingle(deletedFileId)

      } else {
        await Chefs.update(chefId, {
          name,
          file_id,
        })
      }  

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