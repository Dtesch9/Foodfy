const db = require('../../config/db')
const { unlinkSync } = require('fs')


const File = {
  init({ table }) {
    if (!table) throw new Error('Invalid Params')

    this.table = table
  },
  async create(fields) { // name: filename, path: path
    try {
      let keys = [],
        values = []

      Object.keys(fields).map(key => {
        keys.push(key) // name
        values.push(`'${fields[key]}'`) // '2313-asinha.png'
      })


      const query = `INSERT INTO ${this.table}
      (${keys.join(',')}) VALUES (${values.join(',')})
      RETURNING id
    `

      const results = await db.query(query)

      return results.rows[0].id
    } catch (error) {
      console.error(error);
    }
  },
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
  }
}


module.exports = File