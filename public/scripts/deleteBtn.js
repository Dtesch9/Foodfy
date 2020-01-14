const formDelete = document.querySelector('form#delete')
const totalRecipes = document.querySelector('#total-recipes')

if (totalRecipes) {
  formDelete.addEventListener('submit', () => {
    if (totalRecipes.value > 0) {
      alert(`Chef com receita(s) não pode ser deletado`)
      event.preventDefault()
    } else {
      const confirmation = confirm('Tem certeza que deseja deletar?')
  
      if (!confirmation) event.preventDefault()
    }
  })
}else {
  formDelete.addEventListener('submit', () => {
    const confirmation = confirm('Tem certeza que deseja deletar?')

    if (!confirmation) event.preventDefault()
  })
  
}