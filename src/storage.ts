import { fetchCategories, fetchTodos, fetchCategoryTodo } from './api'
import { createCategoryElement } from './createing-categories'
import { creatTodoElement } from './createing-todo'
import type { CategoryData, TodoData, categoryTodo } from './types'

export const todos: TodoData[] = []
export const categories: CategoryData[] = []
export const categoryTodos: categoryTodo[] = []

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
  selecterCategoryForTodo: HTMLSelectElement,
): Promise<void> {
  if (amg) {
    amg.classList.remove('hidden')
  }
  try {
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
        selecterCategoryForTodo
      )
    })

const categoryTodo = await fetchCategoryTodo()
    categoryTodos.length = 0
    categoryTodo.forEach((ct) => {
      categoryTodos.push(ct)
    })

    const todo = await fetchTodos()
    todos.length = 0
    listTodo.innerHTML = ''
    todo.forEach((t) => {
      todos.push(t)
      const idCategory = categoryTodos.find(ct => ct.todo_id === t.id)
      creatTodoElement(t, listTodo, todos, error, idCategory ? idCategory.category_id : 0, categories)
    })
  } catch {
    throw new Error('Failed to load todos and categories')
  } finally {
    amg.classList.add('hidden')
  }
}
