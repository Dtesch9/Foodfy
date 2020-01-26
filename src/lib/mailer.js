const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "9207918cabe1e8",
    pass: "8f2fb2ce63fa21"
  }
})