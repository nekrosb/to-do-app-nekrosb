export const hiddenCreateMenu = (
  plusBtn: HTMLButtonElement,
  deleteAllBtn: HTMLButtonElement,
  listTodo: HTMLDivElement,
  menuCreat: HTMLDivElement,
  categoryBtn: HTMLButtonElement,
): void => {
  plusBtn.classList.remove('hidden')
  deleteAllBtn.classList.remove('hidden')
  listTodo.classList.remove('hidden')
  menuCreat.classList.add('hidden')
  categoryBtn.classList.remove('hidden')
}

export const showCreateMenu = (
  plusBtn: HTMLButtonElement,
  deleteAllBtn: HTMLButtonElement,
  listTodo: HTMLDivElement,
  menuCreat: HTMLDivElement,
  categoryBtn: HTMLButtonElement,
): void => {
  plusBtn.classList.add('hidden')
  deleteAllBtn.classList.add('hidden')
  listTodo.classList.add('hidden')
  categoryBtn.classList.add('hidden')
  menuCreat.classList.remove('hidden')
}

export function showCategory(
  plusBtn: HTMLButtonElement,
  deleteAllBtn: HTMLButtonElement,
  listTodo: HTMLDivElement,
  listCategory: HTMLDivElement,
  addCategoryBtn: HTMLButtonElement,
  categoryBTN: HTMLButtonElement,
  closeCategoryListBtn: HTMLButtonElement,
): void {
  plusBtn.classList.add('hidden')
  deleteAllBtn.classList.add('hidden')
  listTodo.classList.add('hidden')
  listCategory.classList.remove('hidden')
  addCategoryBtn.classList.remove('hidden')
  categoryBTN.classList.add('hidden')
  closeCategoryListBtn.classList.remove('hidden')
}

export function hideCategory(
  plusBtn: HTMLButtonElement,
  deleteAllBtn: HTMLButtonElement,
  listTodo: HTMLDivElement,
  listCategory: HTMLDivElement,
  addCategoryBtn: HTMLButtonElement,
  categoryBTN: HTMLButtonElement,
  closeCategoryListBtn: HTMLButtonElement,
): void {
  plusBtn.classList.remove('hidden')
  deleteAllBtn.classList.remove('hidden')
  listTodo.classList.remove('hidden')
  listCategory.classList.add('hidden')
  addCategoryBtn.classList.add('hidden')
  categoryBTN.classList.remove('hidden')
  closeCategoryListBtn.classList.add('hidden')
}

export const showCategoryCreateMenu = (
  categoryList: HTMLDivElement,
  addCategoryBtn: HTMLButtonElement,
  closeCategoryMenuBtn: HTMLButtonElement,
  createCategoryMenu: HTMLDivElement,
): void => {
  categoryList.classList.add('hidden')
  addCategoryBtn.classList.add('hidden')
  closeCategoryMenuBtn.classList.add('hidden')
  createCategoryMenu.classList.remove('hidden')
}

export const hiddenCategoryCreateMenu = (
  categoryList: HTMLDivElement,
  addCategoryBtn: HTMLButtonElement,
  closeCategoryListBtn: HTMLButtonElement,
  createCategoryMenu: HTMLDivElement,
): void => {
  categoryList.classList.remove('hidden')
  addCategoryBtn.classList.remove('hidden')
  closeCategoryListBtn.classList.remove('hidden')
  createCategoryMenu.classList.add('hidden')
}
