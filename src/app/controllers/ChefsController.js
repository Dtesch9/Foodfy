const Chefs = require('../models/Chefs')

module.exports = {
  async index(req, res) {
    try {
      const chefs = await Chefs.all()

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
      const recipes = await Chefs.recipesChef(req.params.id)

      const { chef } = req

      return res.render('admin/chefs/show', { recipes, chef })
    } catch (error) {
      console.error(error)
    }
  },
  async post(req, res) {
    try {
    const chefId = await Chefs.create(req.body)
    
    return res.redirect(`/admin/chefs/${chefId}`)
    } catch (error) {
      console.error(error)
    }
  },
  async edit(req, res) {
    try {
      const chef = req.chef

      return res.render('admin/chefs/edit', { chef })
    } catch (error) {
      console.error(error)
    }
  },
  async put(req, res) {
    try {
      await Chefs.update(req.body)

      return res.redirect(`/admin/chefs/${req.body.id}`)
    } catch (error) {
      console.error(error)
    }
  },
  async delete(req, res) {
    try {
      await Chefs.delete(req.body.id)

      return res.redirect('/admin/chefs')
    } catch (error) {
      console.error(error)
    }
  }   
}