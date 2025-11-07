import type { TodoData } from './types'
import { creatTodoElement } from './createing-todo'

export let todos: TodoData[] = []

export function load(
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

export function save(): void {
  localStorage.setItem('todos', JSON.stringify(todos))
}

