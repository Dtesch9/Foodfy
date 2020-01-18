const db = require('../../config/db')

const Base = {
  init({ table }) {
    if (!table) throw new Error('Invalid Params')

    this.table = table
  },
  async create(fields) { // name: Douglas, path: public/images
    try {
      let keys = [],
        values = []

      Object.keys(fields).map(key => {
        keys.push(key) // name

        if (key == 'ingredients' || key == 'preparation') {
          values.push(`'{${fields[key]}}'`)
        } else {
          values.push(`'${fields[key]}'`) // '2313-asinha.png'
        }
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
  update(id, fields) {
    try {
      let line = []

      Object.keys(fields).map(key => {
        if (key == 'ingredients' || key == 'preparation') {
          line.push(`${key} = '{${fields[key]}}'`)
        } else {
          line.push(`${key} = '${fields[key]}'`)
        }
      })

      const update = `UPDATE ${this.table} 
        SET ${line.join(',')}
        WHERE id = ${id} 
      `
      console.log(update)

      return db.query(update)
    } catch (error) {
      console.error(error)
    }
  }
}


module.exports = Base