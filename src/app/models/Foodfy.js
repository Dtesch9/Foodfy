const db = require('../../config/db')

module.exports = {
  async findBy(filter) {
    try {
      const results =
        await db.query(`
      SELECT recipes.*, chefs.name AS author 
      FROM recipes
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
      WHERE recipes.title ILIKE '%${filter}%'`)

      return results.rows
    } catch (error) {
      console.error(error)
    }
  },
  async chefs() {
    const results = 
    await db.query(`
      SELECT name, COUNT(recipes) AS total_recipes
      FROM chefs
      LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
      GROUP BY chefs.id`)

    return results.rows
  }
}