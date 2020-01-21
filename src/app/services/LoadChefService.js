const File = require('../models/File')
const Chefs = require('../models/Chefs')

async function format(chef) {
  const file = await getImage(chef.file_id)

  chef.image = file.path
  chef.file = file

  return chef
}

async function getImage(fileId) {
  File.init({ table: 'files' })
  const chefFile = await File.findOne(fileId)
  
  chefFile.path = chefFile.path.replace('public', '')

  return chefFile
}


const loadService = {
  load(service, filter) {
    this.filter = filter

    return this[service](filter)
  },
  async chef(){
    const chef = await Chefs.findWithJoin(this.filter)

    return await format(chef)
  },
  async chefs(orderBy){
    const chefs = await Chefs.findAll(null, orderBy)
    const chefsPromise = chefs.map(format)

    return await Promise.all(chefsPromise)
  },
  format
}

module.exports = loadService