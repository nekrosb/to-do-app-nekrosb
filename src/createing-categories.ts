import { deleteCategoryFromAPI, postCategory, updateCategoryInAPI, deleteCategoryTodoFromAPIFromCategory } from './api'
import { hiddenCategoryCreateMenu, showCategoryCreateMenu } from './menus'
import type { CategoryData, categoryTodo, contentCategoryData,  } from './types'
import { categoryTodos } from './storage'

async function updaitCategory(
  id: number,
  listCategory: HTMLDivElement,
  chengeCategory: HTMLDivElement,
  newNameCategory: HTMLInputElement,
  newCalorCategory: HTMLInputElement,
  addCategoryBtn: HTMLButtonElement,
  closeCategoryListBtn: HTMLButtonElement,
  categories: CategoryData[],
  selecterCategoryForTodo: HTMLSelectElement,
): Promise<void> {
  const aldCategory = categories.find((t) => t.id === id)
  if (!aldCategory) return

  if (newNameCategory.value !== '') {
    aldCategory.title = newNameCategory.value
  }

  if (newCalorCategory.value !== '') {
    aldCategory.color = newCalorCategory.value
  }

  await updateCategoryInAPI(aldCategory)

  const div = listCategory?.querySelector<HTMLDivElement>(`[data-id='${id}']`)
  const option = selecterCategoryForTodo.querySelector<HTMLOptionElement>(`[data-id='${id}-option']`)
  if (!option) return
  if (div) {
    if (newCalorCategory.value !== '') {
      div.style.backgroundColor = aldCategory.color
      const btn = div.querySelector<HTMLButtonElement>('button')
      if (btn) {
        btn.style.backgroundColor = aldCategory.color
      }
    }

    if (newNameCategory.value !== '') {
      const p = div.querySelector<HTMLParagraphElement>('p')
      if (p) {
        p.textContent = aldCategory.title
        option.textContent = aldCategory.title
        
      }
    }
  }

  hiddenCategoryCreateMenu(
    listCategory,
    addCategoryBtn,
    closeCategoryListBtn,
    chengeCategory,
  )
  newNameCategory.value = ''
  newCalorCategory.value = '#000000'
}

function deleteCategory(
  id: number,
  listCategory: HTMLDivElement,
  categories: CategoryData[],
  selecterCategoryForTodo: HTMLSelectElement,
): void {
  const category = categories.findIndex((t) => t.id === id)
  if (category === -1) return
  deleteCategoryFromAPI(id)
  categories.splice(category, 1)

while (true) {
  const ct = categoryTodos.findIndex(p => p.category_id === id)
  if (ct === -1) break
    categoryTodos.splice(ct, 1)
  }

  deleteCategoryTodoFromAPIFromCategory(id)

  const div = listCategory?.querySelector<HTMLDivElement>(`[data-id='${id}']`)
  const option = selecterCategoryForTodo.querySelector(`[data-id='${id}-option']`)
  if (!option) return
  if (div) {
    div.remove()
    option.remove()
  }
  location.reload()
}

export function createCategoryElement(
  listCategory: HTMLDivElement,
  category: CategoryData,
  categories: CategoryData[],
  chengeCategory: HTMLDivElement,
  newNameCategory: HTMLInputElement,
  newCalorCategory: HTMLInputElement,
  addCategoryBtn: HTMLButtonElement,
  closeCategoryListBtn: HTMLButtonElement,
  updaitCategoryBtn: HTMLButtonElement,
  selecterCategoryForTodo: HTMLSelectElement,
): void {
  const categoryDiv = document.createElement('div')
  categoryDiv.classList.add('category-element')
  categoryDiv.style.backgroundColor = category.color
  categoryDiv.dataset.id = category.id.toString()

  const categoryTitle = document.createElement('p')
  categoryTitle.textContent = category.title

  const chengeBtn = document.createElement('button')
  chengeBtn.textContent = '✏️'
  chengeBtn.style.backgroundColor = category.color

  const deleteCategoryBtn = document.createElement('button')
  deleteCategoryBtn.textContent = '🗑️'
  deleteCategoryBtn.style.backgroundColor = 'red'

  const ul = document.createElement('ul')

  const liTitle = document.createElement('li')
  liTitle.appendChild(categoryTitle)
  ul.appendChild(liTitle)

  const liChenge = document.createElement('li')
  liChenge.appendChild(chengeBtn)
  ul.appendChild(liChenge)

  const liDelete = document.createElement('li')
  liDelete.appendChild(deleteCategoryBtn)
  ul.appendChild(liDelete)
  categoryDiv.appendChild(ul)

  const optionForSelecter = document.createElement("option")
  optionForSelecter.value = category.id.toString()
  optionForSelecter.textContent = category.title
  optionForSelecter.dataset.id = `${category.id}-option`
  selecterCategoryForTodo.appendChild(optionForSelecter)

  listCategory.appendChild(categoryDiv)

  deleteCategoryBtn.addEventListener('click', () => {
    deleteCategory(category.id, listCategory, categories, selecterCategoryForTodo)
  })

  chengeBtn.addEventListener('click', () => {
    showCategoryCreateMenu(
      listCategory,
      addCategoryBtn,
      closeCategoryListBtn,
      chengeCategory,
          )
    updaitCategoryBtn.addEventListener('click', () => {
      updaitCategory(
        category.id,
        listCategory,
        chengeCategory,
        newNameCategory,
        newCalorCategory,
        addCategoryBtn,
        closeCategoryListBtn,
        categories,
        selecterCategoryForTodo
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
  CreatCategoryMenu: HTMLDivElement,
  updaitCategoryBtn: HTMLButtonElement,
  newNameCategory: HTMLInputElement,
  newCalorCategory: HTMLInputElement,
  chengeCategory: HTMLDivElement,
  selecterCategoryForTodo: HTMLSelectElement,
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
      chengeCategory,
      newNameCategory,
      newCalorCategory,
      addCategoryBtn,
      closeCategoryListBtn,
      updaitCategoryBtn,
      selecterCategoryForTodo
    )
    titleInput.value = ''
    color.value = '#000000'
    hiddenCategoryCreateMenu(
      listCategory,
      addCategoryBtn,
      closeCategoryListBtn,
      CreatCategoryMenu,
    )
  }
}
