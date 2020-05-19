const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "a30fbb9620060e",
    pass: "7ffb61818ec223"
  }
});