const db = require('../../config/db')
const Base = require('./Base')
const { unlinkSync } = require('fs')



module.exports = {
  ...Base, 
  async delete(id) {
    try {
      const result = await db.query('SELECT * FROM files WHERE id = $1', [id])
      const filePath = result.rows[0].path


      await db.query(`DELETE FROM recipe_files WHERE file_id = $1`, [id])
      
      await db.query(`DELETE FROM files WHERE id = $1`, [id])

      unlinkSync(filePath)

      return
    } catch (error) {
      console.error(error);
    }
  },
  async deleteSingle(id) {
    try {
      const result = await db.query('SELECT * FROM files WHERE id = $1', [id])
      const filePath = result.rows[0].path

      await db.query('DELETE FROM files WHERE id = $1', [id])

      unlinkSync(filePath)
    } catch (error) {
      console.error(error)
    }
  }
}