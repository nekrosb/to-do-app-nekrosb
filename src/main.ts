import './style.css'
import { deleteAllApiTodos } from './api'
import { creatNewToDo } from './createing-todo'
import { hiddenCreateMenu, showCreateMenu } from './menus'
import { load, todos } from './storage'
import type { TodoData } from './types'

console.log('Hello from typescript') // litel constants

// taking all dom in ts
const imgLoad = document.querySelector<HTMLImageElement>('#img-load')
const listTodo = document.querySelector<HTMLDivElement>('#todo-list')
const menuCreat = document.querySelector<HTMLDivElement>('#creat-todo')
const closeCreatMenuBtn =
  document.querySelector<HTMLButtonElement>('#close-create-menu')
const addNewTodoBtn =
  document.querySelector<HTMLButtonElement>('#add-new-todo-btn')
const titleInput = document.querySelector<HTMLInputElement>('#todo-input')
const contentInput = document.querySelector<HTMLInputElement>('#content-input')
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
  !errorParagraph ||
  !contentInput ||
  !imgLoad
) {
  throw new Error('html element not found')
}

// main logic
errorParagraph.classList.add('hidden')
menuCreat.classList.add('hidden')
function deleteAll(list: HTMLDivElement, TodosList: TodoData[]): void {
  TodosList.length = 0
  deleteAllApiTodos()
  list.innerHTML = ''
}

imgLoad.classList.add('hidden')

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
    menuCreat,
    contentInput,
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
      menuCreat,
      contentInput,
    )
  }
})

deleteAllBtn.addEventListener('click', () => {
  deleteAll(listTodo, todos)
})

load(listTodo, errorParagraph, imgLoad)
