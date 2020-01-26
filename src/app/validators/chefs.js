const Chefs = require('../models/Chefs')


function checkAllfields(body) {
  const keys = Object.keys(body)

  for (let key of keys) {
    if (body[key] == "" && key != "removed_photo") return true
  }
}

function post(req, res, next) {
  try {
    const emptyField = checkAllfields(req.body)

    if (emptyField) return res.render('admin/chefs/create', {
      chef: req.body,
      warning: 'Por favor preencha todos os campos!'
    })

    if (!req.file) return res.render('admin/chefs/create', {
      chef: req.body,
      error: 'Envie pelo menos uma imagem'
    })

    next()
  } catch (error) {
    console.error(error)

    return res.render('admin/chefs/create', {
      chef: req.body,
      error: 'Erro inesperado! Tente novamente'
    })
  }
}

function put(req, res, next) {
  try {
    const emptyField = checkAllfields(req.body)

    if (emptyField) return res.render('admin/chefs/create', {
      chef: req.body,
      warning: 'Por favor preencha todos os campos!'
    })

    next()
  } catch (error) {
    console.error(erro)

    return res.render('admin/chefs/edit', {
      chef: req.body,
      warnning: 'Por favor preencha todos os campos!'
    })
  }
}

async function existence(req, res, next) {
  try {
    const chef = await Chefs.findWithJoin(req.params.id)

    if (!chef) return res.render('admin/chefs/edit', {
      error: 'Chef não foi encontrado!'
    })

    req.chefId = req.params.id

    next()
  } catch (error) {
    console.error(error)

    return res.render('admin/chefs/edit', {
      error: 'Erro inesperado! Tente novamente'
    })
  }
}

module.exports = {
  post,
  put,
  existence
}