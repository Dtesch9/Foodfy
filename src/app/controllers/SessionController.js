


module.exports = {
  loginForm(req, res) {
    return res.render('admin/session/login')
  },
  login(req, res) {
    req.session.userId = req.user.id

    return res.render('admin/users/index', {
      user: req.user,
      success: `Bem vindo ${req.user.name}`
    })
  },
  logout(req, res) {
    req.session.destroy()
    return res.redirect('/admin/users')
  }
}