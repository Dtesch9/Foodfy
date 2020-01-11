const items = document.querySelectorAll('.item')

for (let item of items) {
  let button = item.querySelector('.prep-title p')

  button.addEventListener('click', () => {
    if (button.innerHTML == 'esconder') {
      item.querySelector('.content').style.display = "none"

      item.querySelector('.prep-title').style.marginBottom = '5%'
      
      button.innerHTML = 'mostrar'

    } else {
      item.querySelector('.content').style.display = "initial"

      item.querySelector('.prep-title').style.marginBottom = '2.9%'

      button.innerHTML = 'esconder'
    }
  })
}