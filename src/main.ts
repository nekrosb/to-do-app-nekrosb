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
const dateInput = document.querySelector<HTMLInputElement>('#date-input')
const errorParagraph =
  document.querySelector<HTMLParagraphElement>('#overdue-message')

if (
  !menuCreat ||
  !listTodo ||
  !titleInput ||
  !addNewTodoBtn ||
  !plusBtn ||
  !deleteAllBtn ||
  !closeCreatMenuBtn ||
  !dateInput ||
  !errorParagraph
) {
  throw new Error('html element not found')
}

// types and local storage

interface TodoData {
  id: number
  title: string
  done: boolean
  date?: string
}

let todos: TodoData[] = []

function load(
  listTodo: HTMLDivElement,
  errorParagraph: HTMLParagraphElement,
): void {
  const saved = localStorage.getItem('todos')
  if (saved) {
    todos = JSON.parse(saved) as TodoData[]
    todos.forEach((todo): void => {
      creatTodoElement(todo, listTodo, todos, errorParagraph)
    })
  }
}

function save(): void {
  localStorage.setItem('todos', JSON.stringify(todos))
}

// main logic
errorParagraph.classList.add('hidden')
const errorMsg = (errorMsg: HTMLParagraphElement): void => {
  todos.forEach((todo): void => {
    if (!todo.date) return
    const selectedDate = new Date(todo.date)
    const today = new Date()

    selectedDate.setHours(0, 0, 0, 0)
    today.setHours(0, 0, 0, 0)
    const difdays = Math.floor(
      (selectedDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    )
    if (difdays < 0 && todo.done === false) {
      errorMsg.classList.remove('hidden')
    } else {
      errorMsg.classList.add('hidden')
    }
  })
}

menuCreat.classList.add('hidden')
const hiddenMainMenu = (
  plusBtn: HTMLButtonElement,
  deleteAllBtn: HTMLButtonElement,
  listTodo: HTMLDivElement,
  menuCreat: HTMLDivElement,
): void => {
  plusBtn.classList.add('hidden')
  deleteAllBtn.classList.add('hidden')
  listTodo.classList.add('hidden')
  menuCreat.classList.remove('hidden')
}

const showMainMenu = (
  plusBtn: HTMLButtonElement,
  deleteAllBtn: HTMLButtonElement,
  listTodo: HTMLDivElement,
  menuCreat: HTMLDivElement,
): void => {
  plusBtn.classList.remove('hidden')
  deleteAllBtn.classList.remove('hidden')
  listTodo.classList.remove('hidden')
  menuCreat.classList.add('hidden')
}

function doneOrNotDone(
  id: number,
  todos: TodoData[],
  listTodo: HTMLDivElement,
): void {
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

function deleteTodo(
  id: number,
  listTodo: HTMLDivElement,
  todos: TodoData[],
): void {
  const todo = todos.findIndex((t) => t.id === id)
  if (todo === -1) return
  todos.splice(todo, 1)
  save()
  const div = listTodo?.querySelector<HTMLDivElement>(`[data-id='${id}']`)
  if (div) {
    div.remove()
  }
}

function colorOfDate(date: string): string {
  const dateTodo = new Date(date)
  const today = new Date()

  dateTodo.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)

  const diffDays = Math.floor(
    (dateTodo.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  )

  if (diffDays < 0) {
    return 'luse-date'
  }

  if (diffDays === 0) {
    return 'today-date'
  }

  if (diffDays >= 1 && diffDays <= 4) {
    return 'close-date'
  }
  if (diffDays > 4) {
    return 'normal-date'
  }

  return ''
}

function creatTodoElement(
  todo: TodoData,
  listTodo: HTMLDivElement,
  todos: TodoData[],
  errorParagraph: HTMLParagraphElement,
): void {
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

  const dateP = document.createElement('p')

  if (todo.date) {
    dateP.innerHTML = `Due <time datetime="${todo.date}">${todo.date}</time>`
    dateP.classList.add(colorOfDate(todo.date))
  } else {
    dateP.textContent = 'No due date'
  }

  const ul = document.createElement('ul')

  if (todo.done) {
    newDiv.classList.toggle('todo-done')
  }

  deleteBtn.addEventListener('click', (): void => {
    deleteTodo(todo.id, listTodo, todos)
    window.location.reload()
    errorMsg(errorParagraph)
  })

  doneBtn.addEventListener('click', (): void => {
    doneOrNotDone(todo.id, todos, listTodo)
    errorMsg(errorParagraph)
  })

  const liTitel = document.createElement('li')
  liTitel.appendChild(p)

  const liDate = document.createElement('li')
  liDate.appendChild(dateP)

  const liButtons = document.createElement('li')
  liButtons.appendChild(doneBtn)
  liButtons.append(deleteBtn)
  ul.appendChild(liTitel)
  ul.appendChild(liDate)
  ul.appendChild(liButtons)
  newDiv.appendChild(ul)

  errorMsg(errorParagraph)

  listTodo?.appendChild(newDiv)
}

const creatNewToDo = (
  listTodo: HTMLDivElement,
  plusBtn: HTMLButtonElement,
  deleteAllBtn: HTMLButtonElement,
  todos: TodoData[],
  titleInput: HTMLInputElement,
  dateInput: HTMLInputElement,
  errorParagraph: HTMLParagraphElement,
): void => {
  const todo: TodoData = {
    id: Date.now(),
    title: titleInput.value,
    done: false,
    date: dateInput.value,
  }
  const dateValue = dateInput.value

  if (dateValue) {
    const selectedDate = new Date(dateValue)
    const today = new Date()

    selectedDate.setHours(0, 0, 0, 0)
    today.setHours(0, 0, 0, 0)

    if (selectedDate < today) {
      alert('The selected date is in the past. Please choose a valid date.')
      return
    }
  }

  if (todo.title !== '') {
    todos.push(todo)
    save()
    creatTodoElement(todo, listTodo, todos, errorParagraph)
    titleInput.value = ''
    showMainMenu(plusBtn, deleteAllBtn, listTodo, menuCreat)
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

plusBtn.addEventListener('click', () => {
  hiddenMainMenu(plusBtn, deleteAllBtn, listTodo, menuCreat)
})

closeCreatMenuBtn.addEventListener('click', () => {
  showMainMenu(plusBtn, deleteAllBtn, listTodo, menuCreat)
})

addNewTodoBtn.addEventListener('click', () => {
  creatNewToDo(
    listTodo,
    plusBtn,
    deleteAllBtn,
    todos,
    titleInput,
    dateInput,
    errorParagraph,
  )
})

titleInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    creatNewToDo(
      listTodo,
      plusBtn,
      deleteAllBtn,
      todos,
      titleInput,
      dateInput,
      errorParagraph,
    )
  }
})

deleteAllBtn.addEventListener('click', () => {
  deleteAll(listTodo)
})

load(listTodo, errorParagraph)
