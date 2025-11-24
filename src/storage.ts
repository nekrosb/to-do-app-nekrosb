import { fetchCategories, fetchCategoryTodo, fetchTodos } from './api'
import { createCategoryElement } from './creating-categories'
import { createTodoElement } from './creating-todo'
import type { CategoryData, categoryTodo, TodoData } from './types'

export const todos: TodoData[] = []
export const categories: CategoryData[] = []
export const categoryTodos: categoryTodo[] = []

export async function load(
  listTodo: HTMLDivElement,
  error: HTMLParagraphElement,
  img: HTMLImageElement,
  listCategory: HTMLDivElement,
  addCategoryBtn: HTMLButtonElement,
  closeCategoryListBtn: HTMLButtonElement,
  updateCategoryBtn: HTMLButtonElement,
  newNameCategory: HTMLInputElement,
  newColorCategory: HTMLInputElement,
  changeCategory: HTMLDivElement,
  selectorCategoryForTodo: HTMLSelectElement,
  filter: HTMLSelectElement
): Promise<void> {
  if (img) {
    img.classList.remove('hidden')
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
        changeCategory,
        newNameCategory,
        newColorCategory,
        addCategoryBtn,
        closeCategoryListBtn,
        updateCategoryBtn,
        selectorCategoryForTodo,
        listTodo,
        filter
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
      const idCategory = categoryTodos.find((ct) => ct.todo_id === t.id)
      createTodoElement(
        t,
        listTodo,
        todos,
        error,
        idCategory ? idCategory.category_id : 0,
        categories,
      )
    })
  } catch {
    throw new Error('Failed to load todos and categories')
  } finally {
    img.classList.add('hidden')
  }
}
