const db = require('../../config/db')

const Base = require('../models/Base')

Base.init({ table: 'chefs' })

module.exports = {
  ...Base,
  async findWithJoin(id) {
    try {
      const results = 
      await db.query(`
      SELECT chefs.*, COUNT(recipes) AS total_recipes 
      FROM chefs 
      LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
      WHERE chefs.id = $1
      GROUP BY chefs.id
      `, [id])

      return results.rows[0]
    } catch (error) {
      console.error(error)
    }
  },
}