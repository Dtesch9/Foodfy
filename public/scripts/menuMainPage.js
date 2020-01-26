const Open = {
  subMenu: '',
  ul: '',
  menu(menu) {
    this.subMenu = menu.parentNode.querySelector('.sub-menu')
    this.ul = this.subMenu.children[0]

    this.subMenu.classList.contains('active') ? this.removeClass() : this.addClass()
  },
  addClass() {
    this.subMenu.classList.add('active')
    this.ul.classList.add('active')
  },
  removeClass() {
    this.subMenu.classList.remove('active')
    this.ul.classList.remove('active')
  }
}

const Thanks = {
  header: document.querySelector('body'),
  rocketseat() {
    this.cleanOldMessage()

    this.header.appendChild(this.createMessage())
  },
  cleanOldMessage() {
    const message = document.querySelector('.messages')

    if (message) message.remove()
  },
  createMessage() {
    const div = document.createElement('div')
    div.setAttribute('class', 'messages')
    div.classList.add('success')

    const subDivContainer = document.createElement('div')
    subDivContainer.setAttribute('class', 'container')
    subDivContainer.innerHTML = 'Obrigado Maykão e Equipe Rocketseat'

    div.appendChild(subDivContainer)

    div.style.top = '270px'
    div.style.backgroundColor = '#6558C3'

    return div
  },
}