const db = require('../../config/db')


function find(filters, table, order) {
  try {
    let query = `SELECT * FROM ${table}`

    if (filters) {
      Object.keys(filters).map(key => {
        query += ` ${key}`

        Object.keys(filters[key]).map(field => {
          query += ` ${field} = '${filters[key][field]}'`
        })
      })
    }

    if (order) {
      query += ` ORDER BY ${order} DESC`
    }


    return db.query(query)
  } catch (error) {
    console.error(error)
  }
}


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

      console.log(query)
      return results.rows[0].id
    } catch (error) {
      console.error(error);
    }
  },
  async findOne(filters) {
    const results = await find(filters, this.table)
    return results.rows[0]
  },
  async findAll(filters, order) {
    const results =  await find(filters, this.table, order)
    return results.rows
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

      return db.query(update)
    } catch (error) {
      console.error(error)
    }
  },
  delete(id) {
    try {
      return db.query(`DELETE FROM ${this.table} WHERE id = ${id}`)
    } catch (error) {
      console.error(error)
    }
  }
}


module.exports = Base