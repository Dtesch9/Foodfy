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