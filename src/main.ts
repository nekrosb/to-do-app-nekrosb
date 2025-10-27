import './style.css'

console.log('Hello from typescript')

// taking all dom in ts
const listTodo = document.querySelector<HTMLDivElement>('#todo-list')
const menuCreat = document.querySelector<HTMLDivElement>('#creat-todo')
const addNewTodoBtn =
  document.querySelector<HTMLButtonElement>('#add-new-todo-btn')
const titleInput = document.querySelector<HTMLInputElement>('#todo-input')
const plusBtn = document.querySelector<HTMLButtonElement>('.add-btn')

if (
  !menuCreat ||
  !listTodo ||
  !titleInput ||
  !addNewTodoBtn ||
  !titleInput ||
  !plusBtn
) {
  throw new Error('html element not found')
}

//local storage

let todos: string[] = []

function load(): void {
  const saved = localStorage.getItem('todos')
  if (saved) {
    todos = JSON.parse(saved)
    todos.forEach((todo): void => {
      creatTodoElement(todo)
    })
  }
}

function save(): void {
  localStorage.setItem('todos', JSON.stringify(todos))
}

// main logic

menuCreat.classList.add('hidden')

const hiddenMainMenu = (): void => {
  plusBtn.classList.add('hidden')
  listTodo.classList.add('hidden')
  menuCreat.classList.remove('hidden')
}

function creatTodoElement(text: string): void {
  const newDiv = document.createElement('div') as HTMLDivElement
  newDiv.classList.add('todo')
  const p = document.createElement('p') as HTMLParagraphElement
  p.textContent = text
  newDiv.appendChild(p)
  listTodo?.appendChild(newDiv)
}

const creatNewToDo = (): void => {
  const text = titleInput.value
  if (text !== '') {
    todos.push(text)
    save()
    creatTodoElement(text)
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
load()
