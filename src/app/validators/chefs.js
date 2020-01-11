const Chefs = require('../models/Chefs')

async function input(req, res, next) {
  const keys = Object.keys(req.body)

  for (let key of keys) {
    if (req.body[key] == "") return res.send('Please fulfill all fields!')
  }

  next()
}

async function existence(req, res, next) {
  const chef = await Chefs.find(req.params.id)

  if (!chef) return res.send('Error 404 not found!')

  req.chef = chef

  next()
}

module.exports = {
  input,
  existence
}