const page = location.pathname
const header = document.querySelector('header')

if (page.includes('login') || page.includes('-')) {
  header.style.display = 'none'
}