import { deleteCategoryFromAPI, postCategory, updateCategoryInAPI } from './api'
import { hiddenCategoryCreateMenu, showCategoryCreateMenu } from './menus'
import type { CategoryData, contentCategoryData } from './types'

async function updaitCategory(
  id: number,
  listCategory: HTMLDivElement,
  chengeCategory: HTMLDivElement,
  newNameCategory: HTMLInputElement,
  newCalorCategory: HTMLInputElement,
  addCategoryBtn: HTMLButtonElement,
  closeCategoryListBtn: HTMLButtonElement,
  categories: CategoryData[],
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
): void {
  const category = categories.findIndex((t) => t.id === id)
  if (category === -1) return
  deleteCategoryFromAPI(id)
  categories.splice(category, 1)

  const div = listCategory?.querySelector<HTMLDivElement>(`[data-id='${id}']`)
  if (div) {
    div.remove()
  }
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

  listCategory.appendChild(categoryDiv)

  deleteCategoryBtn.addEventListener('click', () => {
    deleteCategory(category.id, listCategory, categories)
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
