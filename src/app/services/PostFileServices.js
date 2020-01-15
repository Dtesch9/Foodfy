const File = require('../models/File')



async function createFile(file) {
  File.init({ table: 'files' })
  const fileId =  await File.create({
    name: file.filename,
    path: file.path
  })

  return fileId
}


async function createFiles(files) {
  File.init({ table: 'files' })
  const filesPromise = files.map(file => File.create({
    name: file.filename,
    path: file.path
  }))

  const filesIds = await Promise.all(filesPromise)

  return filesIds
}


async function filesTableRelation(files, recipe_id) {
  const filesIds = await createFiles(files)

  File.init({ table: 'recipe_files' })
  const relationPromise = filesIds.map(id => File.create({
    recipe_id,
    file_id: id
  }))

  return await Promise.all(relationPromise)
}



const FileService = {
  post(service, data, id) {
    this.data = data
    this.id = id

    return this[service](data, id)
  },
  async files() {
    return await filesTableRelation(this.data, this.id)
  },
  createFile
}


module.exports = FileService