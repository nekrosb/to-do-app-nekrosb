import './style.css'

console.log('Hello from typescript')
// taking all dom in ts
const listTodo = document.querySelector<HTMLDivElement>('#todo-list')
if (!listTodo) {
  throw new Error('hil')
}
const menuCreat = document.querySelector<HTMLDivElement>('#creat-todo')
if (!menuCreat) {
  throw new Error('hil')
}
const addNewTodoBtn =
  document.querySelector<HTMLButtonElement>('#add-new-todo-btn')
if (!addNewTodoBtn) {
  throw new Error('hil')
}
const titleInput = document.querySelector<HTMLInputElement>('#todo-input')
if (!titleInput) {
  throw new Error('hil')
}
const plusBtn = document.querySelector<HTMLButtonElement>('.add-btn')
if (!plusBtn) {
  throw new Error('hil')
}

// main logic

menuCreat.classList.add('hidden')

const hiddenMainMenu = (): void => {
  plusBtn.classList.add('hidden')
  listTodo.classList.add('hidden')
  menuCreat.classList.remove('hidden')
}

const creatNewToDo = (): void => {
  if (titleInput.value !== '') {
    const newDiv = document.createElement('div') as HTMLDivElement
    newDiv.classList.add('todo')
    const p = document.createElement('p') as HTMLParagraphElement
    p.textContent = titleInput.value
    newDiv.appendChild(p)
    listTodo.appendChild(newDiv)
    titleInput.value = ''
    plusBtn.classList.remove('hidden')
    listTodo.classList.remove('hidden')
    menuCreat.classList.add('hidden')
  } else {
    alert('you forget sam sings')
  }
}

plusBtn.addEventListener('click', hiddenMainMenu)

addNewTodoBtn.addEventListener('click', () => {
  creatNewToDo()
})

titleInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    creatNewToDo()
  }
})
