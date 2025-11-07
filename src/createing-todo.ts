import { finishHimText, iEmNotDieText, errorMsg, hiddenCreateMenu } from './main'
import type { TodoData } from './types'
import { save } from './storage'


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

export function creatTodoElement(
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

export const creatNewToDo = (
  listTodo: HTMLDivElement,
  plusBtn: HTMLButtonElement,
  deleteAllBtn: HTMLButtonElement,
  todos: TodoData[],
  titleInput: HTMLInputElement,
  dateInput: HTMLInputElement,
  errorParagraph: HTMLParagraphElement,
  menuCreat: HTMLDivElement
): void => {
  const todo: TodoData = {
    id: Date.now(),
    title: titleInput.value,
    done: false,
    date: dateInput.value ? dateInput.value : undefined,
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
    hiddenCreateMenu(plusBtn, deleteAllBtn, listTodo, menuCreat)
  } else {
    alert('you forget sam sings')
  }
}

