const db = require('../../config/db')

const { filteredArray, date } = require('../../lib/utility')

module.exports = {
  async all() {
    try {
      const results = 
      await db.query(`
      SELECT recipes.*, chefs.name AS author 
      FROM recipes
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
      `)

      return results.rows
    } catch (error) {
      console.error(error) 
    }
  },
  async create(data) {
    try {
      const query = `
      INSERT INTO recipes (
        chef_id,
        title,
        ingredients,
        preparation,
        information,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
  `

      const values = [
        data.chef_id || 1,
        data.title,
        data.ingredients,
        data.preparation,
        data.information,
        date(Date.now()).iso
      ]

      const results = await db.query(query, values)

      return results.rows[0].id
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
  update(data) {
    try {
      const query = `
        UPDATE recipes SET
          chef_id=($1),
          title=($2),
          ingredients=($3),
          preparation=($4),
          information=($5)
        WHERE id = $6
        `

      const values = [
        data.chef_id || 1,
        data.title,
        filteredArray(data.ingredients),
        filteredArray(data.preparation),
        data.information,
        data.id
      ]

      return db.query(query, values)

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