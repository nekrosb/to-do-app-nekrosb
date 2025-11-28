import {
  deleteCategoryTodoFromAPIFromTodo,
  deleteTodoFromAPI,
  postCategoryTodo,
  postTodo,
  updateTodoInAPI,
} from './api'
import { errorMsg } from './errors'
import { hiddenCreateMenu } from './menus'
import { categoryTodos } from './storage'

import { finishHimText, iAmNotDeadText } from './texts'
import type {
  CategoryData,
  categoryTodo,
  contentTodoData,
  TodoData,
} from './types'

async function doneOrNotDone(
  id: number,
  todos: TodoData[],
  listTodo: HTMLDivElement,
): Promise<void> {
  const todo = todos.find((t) => t.id === id)
  if (!todo) return
  todo.done = !todo.done

  await updateTodoInAPI(todo)

  const div = listTodo?.querySelector<HTMLDivElement>(`[data-id='${id}']`)

  if (div) {
    div.classList.toggle('todo-done')
    const btn = div.querySelector<HTMLButtonElement>('.finish-todo-btn')
    if (btn) {
      btn.innerHTML = !todo.done ? finishHimText : iAmNotDeadText
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
  deleteTodoFromAPI(id)
  todos.splice(todo, 1)
  const ct = categoryTodos.findIndex((ct) => ct.todo_id === id)
  if (ct !== -1) {
    categoryTodos.splice(ct, 1)
  }
  deleteCategoryTodoFromAPIFromTodo(id)

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
    return 'past-date'
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

export function createTodoElement(
  todo: TodoData,
  listTodo: HTMLDivElement,
  todos: TodoData[],
  errorParagraph: HTMLParagraphElement,
  idCategory: number,
  categories: CategoryData[],
): void {
  const newDiv = document.createElement('div') as HTMLDivElement
  newDiv.classList.add('todo')
  newDiv.dataset.id = todo.id.toString()

  if (idCategory !== 0) {
    const category = categories.find((c) => c.id === idCategory)
    newDiv.style.borderColor = category ? category.color : 'gray'
  } else {
    newDiv.style.borderColor = 'gray'
  }

  const p = document.createElement('p') as HTMLParagraphElement
  p.textContent = todo.title

  const pContent = document.createElement('p') as HTMLParagraphElement
  pContent.textContent = todo.content ? todo.content : ''

  const doneBtn = document.createElement('button')
  doneBtn.innerHTML = !todo.done ? finishHimText : iAmNotDeadText
  doneBtn.classList.add('finish-todo-btn')

  const deleteBtn = document.createElement('button')
  deleteBtn.textContent = 'X'
  deleteBtn.classList.add('delete-todo-btn')

  const dateP = document.createElement('p')

  if (todo.due_date) {
    dateP.innerHTML = `Due <time datetime="${todo.due_date}">${todo.due_date}</time>`
    dateP.classList.add(colorOfDate(todo.due_date))
  } else {
    dateP.textContent = 'No due date'
  }

  const ul = document.createElement('ul')

  if (todo.done) {
    newDiv.classList.toggle('todo-done')
  }

  deleteBtn.addEventListener('click', (): void => {
    deleteTodo(todo.id, listTodo, todos)
    errorMsg(errorParagraph)
  })

  doneBtn.addEventListener('click', (): void => {
    doneOrNotDone(todo.id, todos, listTodo)
    errorMsg(errorParagraph)
  })

  const liTitle = document.createElement('li')
  liTitle.appendChild(p)

  const liDate = document.createElement('li')
  liDate.appendChild(dateP)

  const liButtons = document.createElement('li')
  liButtons.appendChild(doneBtn)
  liButtons.append(deleteBtn)
  ul.appendChild(liTitle)
  ul.appendChild(pContent)
  ul.appendChild(liDate)
  ul.appendChild(liButtons)
  newDiv.appendChild(ul)

  errorMsg(errorParagraph)

  listTodo?.appendChild(newDiv)
}

export async function createNewTodo(
  listTodo: HTMLDivElement,
  plusBtn: HTMLButtonElement,
  deleteAllBtn: HTMLButtonElement,
  todos: TodoData[],
  titleInput: HTMLInputElement,
  dateInput: HTMLInputElement,
  errorParagraph: HTMLParagraphElement,
  menuCreate: HTMLDivElement,
  contentInput: HTMLInputElement,
  categoryBtn: HTMLButtonElement,
  selectorCategoryForTodo: HTMLSelectElement,
  categoryTodo: categoryTodo[],
  categories: CategoryData[],
): Promise<void> {
  const todo: contentTodoData = {
    title: titleInput.value,
    content: contentInput.value,
    due_date: dateInput.value ? dateInput.value : undefined,
    done: false,
  }

  if (dateInput.validity.badInput || !dateInput.validity.valid) {
    alert('The date format is incorrect. Please use YYYY-MM-DD format.')
    return
  }

  const dateValue = dateInput.value

  if (dateValue) {
    const selectedDate = new Date(dateValue)
    const today = new Date()

    selectedDate.setHours(0, 0, 0, 0)
    today.setHours(0, 0, 0, 0)

    if (selectedDate < today) {
      alert(
        'The selected date is in the past or not complete. Please choose a valid date.',
      )
      return
    }
  }

  if (todo.title !== '') {
    const t = await postTodo(todo)
    todos.push(t)
    const objCategoryTodo: categoryTodo = {
      category_id: Number(selectorCategoryForTodo.value),
      todo_id: t.id,
    }
    await postCategoryTodo(objCategoryTodo)
    categoryTodo.push(objCategoryTodo)
    createTodoElement(
      t,
      listTodo,
      todos,
      errorParagraph,
      objCategoryTodo.category_id,
      categories,
    )
    titleInput.value = ''
    contentInput.value = ''
    dateInput.value = ''
    hiddenCreateMenu(plusBtn, deleteAllBtn, listTodo, menuCreate, categoryBtn)
  } else {
    alert('You forgot something')
  }
}
