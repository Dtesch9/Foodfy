const db = require('../../config/db')
const Base = require('../models/Base')
const { filteredArray, date } = require('../../lib/utility')

Base.init({ table: 'recipes' })

module.exports = {
  ...Base,
  async all() {
    try {
      const results = 
      await db.query(`
      SELECT recipes.*, chefs.name AS author 
      FROM recipes
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
      ORDER BY recipes.updated_at DESC
      `)

      return results.rows
    } catch (error) {
      console.error(error) 
    }
  },
  async find(id) {
    try {
      const results = 
      await db.query(`
        SELECT recipes.*, chefs.name AS author 
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id) 
        WHERE recipes.id = $1`, [id])

      return results.rows[0]
    } catch (error) {
      console.error(error)
    }
  },
  delete(id) {
    try {
      return db.query(`DELETE FROM recipes WHERE id = $1`, [id])
    } catch (error) {
      console.error(error)
    }
  },
  async recipeSelectOptions() {
    try {
      const results = await db.query(`SELECT name, id FROM chefs`)

      return results.rows
    } catch (error) {
      console.error(error)
    }
  },
  async recipesChef(id) {
    try {
      const results =
        await db.query(`
          SELECT * FROM recipes
          WHERE chef_id = $1`, [id])

      return results.rows
    } catch (error) {
      console.error(erro)
    }
  },
  async files(id) {
    try {
      const results = await db.query(`
        SELECT files.*, recipe_id, file_id
        FROM files
        LEFT JOIN recipe_files ON (files.id = recipe_files.file_id)
        WHERE recipe_files.recipe_id = $1`, [id])

      return results.rows
    } catch (error) {
      console.error(error);
    }
  }
}