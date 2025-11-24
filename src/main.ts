import './style.css'
import { deleteAllApiTodos, deleteAllCategoryTodos } from './api'
import { createNewCategory } from './creating-categories'
import { createNewTodo } from './creating-todo'
import {
  hiddenCategoryCreateMenu,
  hiddenCreateMenu,
  hideCategory,
  showCategory,
  showCategoryCreateMenu,
  showCreateMenu,
} from './menus'
import { categories, categoryTodos, load, todos } from './storage'
import type { TodoData } from './types'

console.log('Hello from TypeScript') // little constants

// taking all dom in ts
const imgLoad = document.querySelector<HTMLImageElement>('#img-load')
const listTodo = document.querySelector<HTMLDivElement>('#todo-list')
const menuCreate = document.querySelector<HTMLDivElement>('#creat-todo')
const closeCreateMenuBtn =
  document.querySelector<HTMLButtonElement>('#close-create-menu')
const addNewTodoBtn =
  document.querySelector<HTMLButtonElement>('#add-new-todo-btn')
const titleInput = document.querySelector<HTMLInputElement>('#todo-input')
const contentInput = document.querySelector<HTMLInputElement>('#content-input')
const plusBtn = document.querySelector<HTMLButtonElement>('#todo-add')
const deleteAllBtn =
  document.querySelector<HTMLButtonElement>('#delete-all-btn')
const dateInput = document.querySelector<HTMLInputElement>('#date-input')
const errorParagraph =
  document.querySelector<HTMLParagraphElement>('#overdue-message')
const categoryMenu = document.querySelector<HTMLDivElement>('#category-menu')
const listCategory = document.querySelector<HTMLDivElement>('#list-category')
const closeMenuCreateCategoryBtn = document.querySelector<HTMLButtonElement>(
  '#close-category-menu',
)
const addCategoryBtn =
  document.querySelector<HTMLButtonElement>('#category-add')
const categoryBtn = document.querySelector<HTMLButtonElement>('#category-btn')
const closeCategoryListBtn = document.querySelector<HTMLButtonElement>(
  '#close-category-list',
)
const addNewCategoryBtn = document.querySelector<HTMLButtonElement>(
  '#add-new-category-btn',
)
const colorInput = document.querySelector<HTMLInputElement>('#color-category')
const titleCategory = document.querySelector<HTMLInputElement>('#name-category')
const changeCategory =
  document.querySelector<HTMLDivElement>('#chenge-category')
const newNameCategory =
  document.querySelector<HTMLInputElement>('#new-name-category')
const newColorCategory = document.querySelector<HTMLInputElement>(
  '#new-color-category',
)
const updateCategoryBtn = document.querySelector<HTMLButtonElement>(
  '#update-category-btn',
)
const selectorCategoryForTodo =
  document.querySelector<HTMLSelectElement>('#select-category')
const filter = document.querySelector<HTMLSelectElement>('#filter')

if (
  !menuCreate ||
  !listTodo ||
  !titleInput ||
  !addNewTodoBtn ||
  !plusBtn ||
  !deleteAllBtn ||
  !closeCreateMenuBtn ||
  !dateInput ||
  !errorParagraph ||
  !contentInput ||
  !imgLoad ||
  !categoryMenu ||
  !listCategory ||
  !closeMenuCreateCategoryBtn ||
  !addCategoryBtn ||
  !categoryBtn ||
  !closeCategoryListBtn ||
  !addNewCategoryBtn ||
  !colorInput ||
  !titleCategory ||
  !changeCategory ||
  !newNameCategory ||
  !newColorCategory ||
  !updateCategoryBtn ||
  !selectorCategoryForTodo ||
  !filter
) {
  throw new Error('html element not found')
}

// main logic
changeCategory.classList.add('hidden')
errorParagraph.classList.add('hidden')

menuCreate.classList.add('hidden')
listCategory.classList.add('hidden')
categoryMenu.classList.add('hidden')
addCategoryBtn.classList.add('hidden')
closeCategoryListBtn.classList.add('hidden')

function deleteAll(list: HTMLDivElement, TodosList: TodoData[]): void {
  TodosList.length = 0
  categoryTodos.length = 0
  deleteAllCategoryTodos()
  deleteAllApiTodos()
  list.innerHTML = ''
}

imgLoad.classList.add('hidden')

// event listeners

categoryBtn.addEventListener('click', () => {
  showCategory(
    plusBtn,
    deleteAllBtn,
    listTodo,
    listCategory,
    addCategoryBtn,
    categoryBtn,
    closeCategoryListBtn,
  )
})

addCategoryBtn.addEventListener('click', () => {
  showCategoryCreateMenu(
    listCategory,
    addCategoryBtn,
    closeCategoryListBtn,
    categoryMenu,
  )
})

closeMenuCreateCategoryBtn.addEventListener('click', () => {
  hiddenCategoryCreateMenu(
    listCategory,
    addCategoryBtn,
    closeCategoryListBtn,
    categoryMenu,
  )
})

addNewCategoryBtn.addEventListener('click', () => {
  createNewCategory(
    listCategory,
    titleCategory,
    colorInput,
    categories,
    addCategoryBtn,
    closeCategoryListBtn,
    categoryMenu,
    updateCategoryBtn,
    newNameCategory,
    newColorCategory,
    changeCategory,
    selectorCategoryForTodo,
    listTodo,
    filter,
  )
})

titleCategory.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    createNewCategory(
      listCategory,
      titleCategory,
      colorInput,
      categories,
      addCategoryBtn,
      closeCategoryListBtn,
      categoryMenu,
      updateCategoryBtn,
      newNameCategory,
      newColorCategory,
      changeCategory,
      selectorCategoryForTodo,
      listTodo,
      filter,
    )
  }
})

closeCategoryListBtn.addEventListener('click', () => {
  hideCategory(
    plusBtn,
    deleteAllBtn,
    listTodo,
    listCategory,
    addCategoryBtn,
    categoryBtn,
    closeCategoryListBtn,
  )
})

plusBtn.addEventListener('click', () => {
  showCreateMenu(plusBtn, deleteAllBtn, listTodo, menuCreate, categoryBtn)
})

closeCreateMenuBtn.addEventListener('click', () => {
  hiddenCreateMenu(plusBtn, deleteAllBtn, listTodo, menuCreate, categoryBtn)
})

addNewTodoBtn.addEventListener('click', () => {
  createNewTodo(
    listTodo,
    plusBtn,
    deleteAllBtn,
    todos,
    titleInput,
    dateInput,
    errorParagraph,
    menuCreate,
    contentInput,
    categoryBtn,
    selectorCategoryForTodo,
    categoryTodos,
    categories,
  )
})

titleInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    createNewTodo(
      listTodo,
      plusBtn,
      deleteAllBtn,
      todos,
      titleInput,
      dateInput,
      errorParagraph,
      menuCreate,
      contentInput,
      categoryBtn,
      selectorCategoryForTodo,
      categoryTodos,
      categories,
    )
  }
})

deleteAllBtn.addEventListener('click', () => {
  deleteAll(listTodo, todos)
})

load(
  listTodo,
  errorParagraph,
  imgLoad,
  listCategory,
  addCategoryBtn,
  closeCategoryListBtn,
  updateCategoryBtn,
  newNameCategory,
  newColorCategory,
  changeCategory,
  selectorCategoryForTodo,
  filter,
)
