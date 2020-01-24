


module.exports = {
  loginForm(req, res) {
    return res.render('admin/session/index')
  },
  logout(req, res) {
    req.session.destroy()
    return res.redirect('/admin/users')
  }
}