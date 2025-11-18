import { fetchCategories, fetchTodos } from './api'
import { createCategoryElement } from './createing-categories'
import { creatTodoElement } from './createing-todo'
import type { CategoryData, TodoData } from './types'

export const todos: TodoData[] = []
export const categories: CategoryData[] = []

export async function load(
  listTodo: HTMLDivElement,
  error: HTMLParagraphElement,
  amg: HTMLImageElement,
  listCategory: HTMLDivElement,
  addCategoryBtn: HTMLButtonElement,
  closeCategoryListBtn: HTMLButtonElement,
  updaitCategoryBtn: HTMLButtonElement,
  newNameCategory: HTMLInputElement,
  newCalorCategory: HTMLInputElement,
  chengeCategory: HTMLDivElement,
): Promise<void> {
  if (amg) {
    amg.classList.remove('hidden')
  }
  try {
    const todo = await fetchTodos()
    todos.length = 0
    listTodo.innerHTML = ''
    todo.forEach((t) => {
      todos.push(t)
      creatTodoElement(t, listTodo, todos, error)
    })
    const category = await fetchCategories()
    categories.length = 0
    listCategory.innerHTML = ''
    category.forEach((c) => {
      categories.push(c)
      createCategoryElement(
        listCategory,
        c,
        categories,
        chengeCategory,
        newNameCategory,
        newCalorCategory,
        addCategoryBtn,
        closeCategoryListBtn,
        updaitCategoryBtn,
      )
    })
  } catch {
    throw new Error('Failed to load todos and categories')
  } finally {
    amg.classList.add('hidden')
  }
}
