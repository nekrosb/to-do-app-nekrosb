import {
  deleteCategoryFromAPI,
  deleteCategoryTodoFromAPIFromCategory,
  postCategory,
  updateCategoryInAPI,
} from './api'
import { hiddenCategoryCreateMenu, showCategoryCreateMenu } from './menus'
import { categoryTodos } from './storage'
import type { CategoryData, contentCategoryData } from './types'

async function updateCategory(
  id: number,
  listCategory: HTMLDivElement,
  changeCategory: HTMLDivElement,
  newNameCategory: HTMLInputElement,
  newColorCategory: HTMLInputElement,
  addCategoryBtn: HTMLButtonElement,
  closeCategoryListBtn: HTMLButtonElement,
  categories: CategoryData[],
  selectorCategoryForTodo: HTMLSelectElement,
): Promise<void> {
  const oldCategory = categories.find((t) => t.id === id)
  if (!oldCategory) return

  if (newNameCategory.value !== '') {
    oldCategory.title = newNameCategory.value
  }

  if (newColorCategory.value !== '') {
    oldCategory.color = newColorCategory.value
  }

  await updateCategoryInAPI(oldCategory)

  const div = listCategory?.querySelector<HTMLDivElement>(`[data-id='${id}']`)
  const option = selectorCategoryForTodo.querySelector<HTMLOptionElement>(
    `[data-id='${id}-option']`,
  )
  if (!option) return
  if (div) {
    if (newColorCategory.value !== '') {
      div.style.backgroundColor = oldCategory.color
      const btn = div.querySelector<HTMLButtonElement>('button')
      if (btn) {
        btn.style.backgroundColor = oldCategory.color
      }
    }

    if (newNameCategory.value !== '') {
      const p = div.querySelector<HTMLParagraphElement>('p')
      if (p) {
        p.textContent = oldCategory.title
        option.textContent = oldCategory.title
      }
    }
  }

  hiddenCategoryCreateMenu(
    listCategory,
    addCategoryBtn,
    closeCategoryListBtn,
    changeCategory,
  )
  newNameCategory.value = ''
  newColorCategory.value = '#000000'
}

function deleteCategory(
  id: number,
  listCategory: HTMLDivElement,
  categories: CategoryData[],
  listTodo: HTMLDivElement,
): void {
  const category = categories.findIndex((t) => t.id === id)
  if (category === -1) return
  deleteCategoryFromAPI(id)
  categories.splice(category, 1)

  while (true) {
    const ct = categoryTodos.findIndex((p) => p.category_id === id)
    if (ct === -1) break

    const todoDiv = listTodo.querySelector<HTMLDivElement>(
      `[data-id='${categoryTodos[ct].todo_id}']`,
    )
    if (todoDiv) {
      todoDiv.style.borderColor = 'gray'
    }
    categoryTodos.splice(ct, 1)
  }

  deleteCategoryTodoFromAPIFromCategory(id)

  const div = listCategory?.querySelector<HTMLDivElement>(`[data-id='${id}']`)
  const option = document.querySelector(
    `[data-id='${id}-option']`,
  )
  if (!option) return
  if (div) {
    div.remove()
    option.remove()
  }
}

export function createCategoryElement(
  listCategory: HTMLDivElement,
  category: CategoryData,
  categories: CategoryData[],
  changeCategory: HTMLDivElement,
  newNameCategory: HTMLInputElement,
  newColorCategory: HTMLInputElement,
  addCategoryBtn: HTMLButtonElement,
  closeCategoryListBtn: HTMLButtonElement,
  updateCategoryBtn: HTMLButtonElement,
  selectorCategoryForTodo: HTMLSelectElement,
  listTodo: HTMLDivElement,
  filter: HTMLSelectElement
): void {
  const categoryDiv = document.createElement('div')
  categoryDiv.classList.add('category-element')
  categoryDiv.style.backgroundColor = category.color
  categoryDiv.dataset.id = category.id.toString()

  const categoryTitle = document.createElement('p')
  categoryTitle.textContent = category.title

  const changeBtn = document.createElement('button')
  changeBtn.textContent = '✏️'
  changeBtn.style.backgroundColor = category.color

  const deleteCategoryBtn = document.createElement('button')
  deleteCategoryBtn.textContent = '🗑️'
  deleteCategoryBtn.style.backgroundColor = 'red'

  const ul = document.createElement('ul')

  const liTitle = document.createElement('li')
  liTitle.appendChild(categoryTitle)
  ul.appendChild(liTitle)

  const liChange = document.createElement('li')
  liChange.appendChild(changeBtn)
  ul.appendChild(liChange)

  const liDelete = document.createElement('li')
  liDelete.appendChild(deleteCategoryBtn)
  ul.appendChild(liDelete)
  categoryDiv.appendChild(ul)

  const optionForSelector = document.createElement('option')
  optionForSelector.value = category.id.toString()
  optionForSelector.textContent = category.title
  optionForSelector.dataset.id = `${category.id}-option`
  selectorCategoryForTodo.appendChild(optionForSelector)
  filter.appendChild(optionForSelector)
  

  listCategory.appendChild(categoryDiv)

  deleteCategoryBtn.addEventListener('click', () => {
    deleteCategory(
      category.id,
      listCategory,
      categories,
      listTodo,
    )
  })

  changeBtn.addEventListener('click', () => {
    showCategoryCreateMenu(
      listCategory,
      addCategoryBtn,
      closeCategoryListBtn,
      changeCategory,
    )
    updateCategoryBtn.addEventListener('click', () => {
      updateCategory(
        category.id,
        listCategory,
        changeCategory,
        newNameCategory,
        newColorCategory,
        addCategoryBtn,
        closeCategoryListBtn,
        categories,
        selectorCategoryForTodo,
      )
    })
  })
}

export async function createNewCategory(
  listCategory: HTMLDivElement,
  titleInput: HTMLInputElement,
  color: HTMLInputElement,
  categories: CategoryData[],
  addCategoryBtn: HTMLButtonElement,
  closeCategoryListBtn: HTMLButtonElement,
  CreateCategoryMenu: HTMLDivElement,
  updateCategoryBtn: HTMLButtonElement,
  newNameCategory: HTMLInputElement,
  newColorCategory: HTMLInputElement,
  changeCategory: HTMLDivElement,
  selectorCategoryForTodo: HTMLSelectElement,
  listTodo: HTMLDivElement,
  filter: HTMLSelectElement,
): Promise<void> {
  const contentCategory: contentCategoryData = {
    title: titleInput.value,
    color: color.value,
  }

  if (contentCategory.title !== '') {
    const category = await postCategory(contentCategory)
    categories.push(category)
    createCategoryElement(
      listCategory,
      category,
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
    titleInput.value = ''
    color.value = '#000000'
    hiddenCategoryCreateMenu(
      listCategory,
      addCategoryBtn,
      closeCategoryListBtn,
      CreateCategoryMenu,
    )
  }
}
