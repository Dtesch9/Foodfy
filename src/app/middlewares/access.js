function onlyUsers(req, res, next) {
  if (!req.session.userId) return res.redirect('/admin/login')

  next()
}

function loggedRedirectToProfile(req, res, next) {
  if (req.session.userId) return res.redirect('/admin/profile')

  next()
}

function onlyAdmins(req, res, next) {
  if (req.session.is_admin != true) return res.redirect('/admin')

  next()
}


module.exports = {
  onlyUsers,
  loggedRedirectToProfile,
  onlyAdmins
}