const cards = document.querySelectorAll('.card')

for (let card of cards) {
  card.querySelector('img').addEventListener('click', () => {
    let id = card.getAttribute('id')
    
    location.href = `/foodfy/recipes/${id}`
  })
}