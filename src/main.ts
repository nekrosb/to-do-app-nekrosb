import './style.css'
import { load, save, todos } from './storage'
import { creatNewToDo } from './createing-todo'
import type { TodoData } from './types'

console.log('Hello from typescript')// litel constants

export const finishHimText = 'FINISH HIM'
export const iEmNotDieText = 'I EM NOT DIE?'

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






// main logic
errorParagraph.classList.add('hidden')
export const errorMsg = (errorMsg: HTMLParagraphElement): void => {
  let n = 0
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
      n += 1
    }
  })

  if (n > 0) {
    errorMsg.classList.remove('hidden')
  } else {
    errorMsg.classList.add('hidden')
  }
}

menuCreat.classList.add('hidden')
export const showCreateMenu = (
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

export const hiddenCreateMenu = (
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

function deleteAll(list: HTMLDivElement, TodosList: TodoData[]): void {
  TodosList.length = 0
  save()
  list.innerHTML = ''
}

// event listeners

plusBtn.addEventListener('click', () => {
  showCreateMenu(plusBtn, deleteAllBtn, listTodo, menuCreat)
})

closeCreatMenuBtn.addEventListener('click', () => {
  hiddenCreateMenu(plusBtn, deleteAllBtn, listTodo, menuCreat)
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
    menuCreat
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
      menuCreat
    )
  }
})

deleteAllBtn.addEventListener('click', () => {
  deleteAll(listTodo, todos)
})

load(listTodo, errorParagraph)
