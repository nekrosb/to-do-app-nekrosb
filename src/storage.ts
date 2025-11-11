import { fetchTodos } from './api'
import { creatTodoElement } from './createing-todo'
import type { TodoData } from './types'

export const todos: TodoData[] = []

export async function load(
  listTodo: HTMLDivElement,
  error: HTMLParagraphElement,
  img: HTMLImageElement,
) {
  img.classList.remove('hidden')
  try {
    const todo = await fetchTodos()
    todos.length = 0
    listTodo.innerHTML = ''
    todo.forEach((t) => {
      todos.push(t)
      creatTodoElement(t, listTodo, todos, error)
    })
  } catch (e) {
    console.log('clear', e)
    img.classList.add('hidden')
  } finally {
    img.classList.add('hidden')
  }
}
