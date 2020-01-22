const User = require('../models/User')

function checkAllfields(body) {
  const keys = Object.keys(body)
  
  for (let key of keys) {
    if (body[key] == "") return true
  }
}

module.exports = {
  async post(req, res, next) {
    const newUser =  req.body

    const emptyField = checkAllfields(newUser)

    if (emptyField) return res.send('Preencha todos os campos!')


    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    })

    if (user) return res.send('Usuário já cadastrado!')

    !newUser.is_admin ? newUser.is_admin = false : true

    req.user = newUser

    next()
  }
}