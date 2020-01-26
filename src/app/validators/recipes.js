const Recipes = require('../models/Recipes')


function checkAllfields(body) {
  const keys = Object.keys(body)

  for (let key of keys) {
    if (body[key] == "" && key != "removed_files") return true
  }
}


module.exports = {
  async create(req, res, next) {
    try {
      const options = await Recipes.recipeSelectOptions()

      if (!options) return res.render('admin/recipes/create', {
        error: 'Não existem chefs para sua receita'
      })

      req.options = options

      next()
    } catch (error) {
      console.error(error)

      return res.render('admin/recipes/create', {
        error: 'Erro inesperado! Tente novamente'
      })
    }
  },
  async bothShowAndEdit(req, res, next) {
    try {
      const verifyRecipe = await Recipes.findOne({ where: { id: req.params.id }})

      if (!verifyRecipe) return res.render('admin/recipes/show', {
        error: 'Receita não encontrada!'
      })

      next()
    } catch (error) {
      console.error(error)

      return res.render('admin/recipes/show', {
        error: 'Erro inesperado! Tente novamente'
      })
    }
  },
  async post(req, res, next) {
    try {
      const options = await Recipes.recipeSelectOptions()

      if (!req.files || req.files.length == 0) return res.render('admin/recipes/create', {
        options,
        error: 'Envie pelo menos uma imagem!'
      })


      const emptyField = checkAllfields(req.body)

      if (emptyField) return res.render('admin/recipes/create', {
        options,
        warning: 'Por Favor, preencha todos os campos'
      })

      next()
    } catch (error) {
      console.error(error)

      return res.render('admin/recipes/create', {
        options,
        error: 'Erro inesperado! Tente novamente'
      })
    }
  }
}