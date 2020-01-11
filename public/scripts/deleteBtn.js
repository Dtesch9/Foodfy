const formDelete = document.querySelector('#delete')
const totalRecipes = document.querySelector('#total-recipes')

formDelete.addEventListener('submit', () => {
  if (totalRecipes.value > 0) {
    alert(`Chef com receita(s) não pode ser deletado`)
    event.preventDefault()
  } else {
    const confirmation = confirm('Tem certeza que deseja deletar esta receita?')

    if (!confirmation) event.preventDefault()
  }
  
})