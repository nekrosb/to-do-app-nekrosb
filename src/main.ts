import './style.css'

console.log('Hello from typescript')

// litel constants

const finishHimText = 'FINISH HIM'
const iEmNotDieText = 'I EM NOT DIE?'

// taking all dom in ts
const listTodo = document.querySelector<HTMLDivElement>('#todo-list')
const menuCreat = document.querySelector<HTMLDivElement>('#creat-todo')
const closeCreatMenuBtn =
  document.querySelector<HTMLButtonElement>('#close-create-menu')
const addNewTodoBtn =
  document.querySelector<HTMLButtonElement>('#add-new-todo-btn')
const titleInput = document.querySelector<HTMLInputElement>('#todo-input')
const plusBtn = document.querySelector<HTMLButtonElement>('.add-btn')
const deleteAllBtn =
  document.querySelector<HTMLButtonElement>('#delete-all-btn')

if (
  !menuCreat ||
  !listTodo ||
  !titleInput ||
  !addNewTodoBtn ||
  !titleInput ||
  !plusBtn ||
  !deleteAllBtn ||
  !closeCreatMenuBtn
) {
  throw new Error('html element not found')
}

// types and local storage

interface TodoData {
  id: number
  title: string
  done: boolean
}

let todos: TodoData[] = []

function load(): void {
  const saved = localStorage.getItem('todos')
  if (saved) {
    todos = JSON.parse(saved) as TodoData[]
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
  deleteAllBtn.classList.add('hidden')
  listTodo.classList.add('hidden')
  menuCreat.classList.remove('hidden')
}

const showMainMenu = (): void => {
  plusBtn.classList.remove('hidden')
  deleteAllBtn.classList.remove('hidden')
  listTodo.classList.remove('hidden')
  menuCreat.classList.add('hidden')
}

function doneOrNotDone(id: number): void {
  const todo = todos.find((t) => t.id === id)
  if (!todo) return
  todo.done = !todo.done
  save()

  const div = listTodo?.querySelector<HTMLDivElement>(`[data-id='${id}']`)

  if (div) {
    div.classList.toggle('todo-done')
    const btn = div.querySelector<HTMLButtonElement>('.finish-todo-btn')
    if (btn) {
      btn.textContent = !todo.done ? finishHimText : iEmNotDieText
    }
  }
}

function deleteTodo(id: number): void {
  const todo = todos.findIndex((t) => t.id === id)
  todos.splice(todo, 1)
  save()
  const div = listTodo?.querySelector<HTMLDivElement>(`[data-id='${id}']`)
  if (div) {
    div.remove()
  }
}

function creatTodoElement(todo: TodoData): void {
  const newDiv = document.createElement('div') as HTMLDivElement
  newDiv.classList.add('todo')
  newDiv.dataset.id = todo.id.toString()

  const p = document.createElement('p') as HTMLParagraphElement
  p.textContent = todo.title

  const doneBtn = document.createElement('button')
  doneBtn.textContent = !todo.done ? finishHimText : iEmNotDieText
  doneBtn.classList.add('finish-todo-btn')

  const deleteBtn = document.createElement('button')
  deleteBtn.textContent = 'X'
  deleteBtn.classList.add('delete-todo-btn')

  if (todo.done) {
    newDiv.classList.toggle('todo-done')
  }

  deleteBtn.addEventListener('click', (): void => {
    deleteTodo(todo.id)
  })

  doneBtn.addEventListener('click', (): void => {
    doneOrNotDone(todo.id)
  })

  newDiv.appendChild(p)
  newDiv.appendChild(doneBtn)
  newDiv.appendChild(deleteBtn)
  listTodo?.appendChild(newDiv)
}

const creatNewToDo = (): void => {
  const todo: TodoData = {
    id: Date.now(),
    title: titleInput.value,
    done: false,
  }

  if (todo.title !== '') {
    todos.push(todo)
    save()
    creatTodoElement(todo)
    titleInput.value = ''
    showMainMenu()
  } else {
    alert('you forget sam sings')
  }
}

function deleteAll(list: HTMLDivElement): void {
  todos = []
  save()
  list.innerHTML = ''
}

// event listeners

plusBtn.addEventListener('click', hiddenMainMenu)

closeCreatMenuBtn.addEventListener('click', showMainMenu)

addNewTodoBtn.addEventListener('click', () => {
  creatNewToDo()
})

titleInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    creatNewToDo()
  }
})

deleteAllBtn.addEventListener('click', () => {
  deleteAll(listTodo)
})

load()
