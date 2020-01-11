const { Pool } = require('pg')

module.exports = new Pool({
  user: 'dtesch',
  password: '123456',
  host: 'localhost',
  port: 5432,
  database: 'foodfydb'
})