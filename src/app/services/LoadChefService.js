const Chefs = require('../models/Chefs')
const File = require('../models/File')

async function format(chef) {
  const file = await getImage(chef.file_id)

  chef.image = file.path
  chef.file = file

  return chef
}

async function getImage(fileId) {
  const file = await Chefs.chefFile(fileId)

  file.path = file.path.replace('public', '')

  return file
}


const loadService = {
  load(service, filter) {
    this.filter = filter

    return this[service](filter)
  },
  async chef(){
    const chef = await Chefs.find(this.filter)

    return await format(chef)
  },
  async chefs(){
    const chefs = await Chefs.all()
    const chefsPromise = chefs.map(format)

    return await Promise.all(chefsPromise)
  },
  format
}

module.exports = loadService