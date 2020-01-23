const PhotosUpload = {
  input: '',
  addedPhotos: document.querySelector('#added-photos'),
  filesLimite: 5,
  files: [],
  handleFileInput(event) {
    const { files: fileList } = event.target // event.target == (#photos-input) and contain a property files which contain our filelist
    PhotosUpload.input = event.target

    if (PhotosUpload.hasLimite(event)) return

    Array.from(fileList).forEach(file => {
      PhotosUpload.files.push(file)

      const reader = new FileReader()

      reader.onload = () => { // Starts when ready
        const image = new Image()
        image.src = String(reader.result) // now we have our BLOB | result of reader.readAsDataURL(file)

        const div = PhotosUpload.createDivContainer(image)
        
        PhotosUpload.addedPhotos.appendChild(div)
      }

      reader.readAsDataURL(file) //  Whenever ready, onload starts | Throw BLOB as URL
    })

    PhotosUpload.input.files = PhotosUpload.getAllFiles()
  },
  hasLimite(event) {
    const { filesLimite, input, addedPhotos } = PhotosUpload
    const { files: fileList } = input

    if (fileList.length > filesLimite) {
      alert(`Permitido apenas ${filesLimite} imagens`)
      this.input.value = null
      event.preventDefault()
      return true
    }

    const photosDiv = []
    addedPhotos.childNodes.forEach(item => {
      if (item.classList && item.classList.value == 'photo')
        photosDiv.push(item)
    })

    const totalPhotos = fileList.length + photosDiv.length
    if (totalPhotos > 5) {
      alert(`Você atingiu o limite máximo de  ${PhotosUpload.filesLimite} fotos`)
      event.preventDefault()
      return true
    }

    return false
  },
  getAllFiles() {
    const dataTransfer = new ClipboardEvent('').clipboardData || new DataTransfer()

    PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

    return dataTransfer.files
  },
  createDivContainer(image) {
    const div = document.createElement('div')
    div.classList.add('photo')

    div.onclick = PhotosUpload.removePhoto // onclick (Event listener click) automatically send the event to the function (removePhoto)

    div.appendChild(image)

    div.appendChild(PhotosUpload.createRemoveButton())

    return div
  },
  createRemoveButton() {
   const button = document.createElement('i')
   button.classList.add('material-icons')
    button.innerHTML = 'delete_forever'
   
   return button
  },
  removePhoto(event) {
    const photoDiv = event.target.parentNode // event.target is <i> | parrentNode is <div.photos>
    const photosArray = Array.from(PhotosUpload.addedPhotos.children)
    const index = photosArray.indexOf(photoDiv)

    PhotosUpload.files.splice(index, 1)
    PhotosUpload.input.files = PhotosUpload.getAllFiles()


    photoDiv.remove()
  },
  removeOldPhoto(event) {
    const photodiv = event.target.parentNode

    if (photodiv.id) {
      const removedFiles = document.querySelector('input[name="removed_files"]')

      if (removedFiles) {
        removedFiles.value += `${photodiv.id},`
      }
    }

    photodiv.remove()
  }
}

const PhotoUpload = {
  input: document.querySelector('.fileName'),
  oldPhotoId: '',
  target: '',
  file: [],
  fileActions(event) {
    this.oldPhotoId = event.target.parentNode.id
    this.target = event.target

    this.removePhoto()

    this.cleanField()

    const { files: fileList } = event.target
    const fileName = fileList[0].name

    Array.from(fileList).forEach(file => this.file.push(file))


    if (fileList.length != 1) {
      alert('Envie 1 photo apenas!')
      event.preventDefault()
    }


    this.input.appendChild(this.createInput(fileName))
    
    event.target.files = this.getFile()
  },
  cleanField() {
    if (this.input.children.length > 0) {
      this.input.children[0].remove()
    }
  },
  createInput(name) {
    const input = document.createElement('input')

    input.setAttribute('placeholder', name)

    return input
  },
  getFile() {
    const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()

    this.file.forEach(file => dataTransfer.items.add(file)) 

    return dataTransfer.files
  },
  removePhoto() {
    const inputHidden = this.target.parentNode.children[0]
    
    inputHidden.value = this.oldPhotoId
  }
}

const ImageGallery = {
  highlight: document.querySelector('.highlight > img'),
  previews: document.querySelectorAll('.gallery-preview img'),
  setImage(event) {
    const { target } = event

    ImageGallery.previews.forEach(previews => previews.classList.remove('active'))

    target.classList.add('active')

    ImageGallery.highlight.src = target.src
  }
}

const CheckBox = {
  click(event) {
    let target = event.target

    target.checked == true ? target.value = 'true' : target.value = 'false'
  }
}

const Close = {
  errorContainer: document.querySelector('.messages'),
  Error() {
    this.errorContainer.style.display = 'none'
  }
}

const Validate = {
  apply(input, func) {
    this.clearError(input)

    let results = Validate[func](input.value)
    input.value = results.value

    if (results.error)
      this.displayError(input, results.error)
    
    
  },
  displayError(input, error) {
    const div = document.createElement('div')
    div.classList.add('error')
    div.innerHTML = error
    input.parentNode.appendChild(div)
    input.focus()
  },
  clearError(input) {
    const errorDiv = input.parentNode.querySelector('.error')

    if (errorDiv)
      errorDiv.remove()
  },
  validEmail(value) {
    let error = null
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if (!value.match(mailformat))
      error = 'Email inválido'

    return {
      error,
      value
    }
  }
}