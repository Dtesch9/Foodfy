const page = location.pathname

if (page.length != 7) {
  document.querySelector('header nav form').style.display = 'none'
}
