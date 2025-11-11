export const hiddenCreateMenu = (
  plusBtn: HTMLButtonElement,
  deleteAllBtn: HTMLButtonElement,
  listTodo: HTMLDivElement,
  menuCreat: HTMLDivElement,
): void => {
  plusBtn.classList.remove('hidden')
  deleteAllBtn.classList.remove('hidden')
  listTodo.classList.remove('hidden')
  menuCreat.classList.add('hidden')
}


export const showCreateMenu = (
  plusBtn: HTMLButtonElement,
  deleteAllBtn: HTMLButtonElement,
  listTodo: HTMLDivElement,
  menuCreat: HTMLDivElement,
): void => {
  plusBtn.classList.add('hidden')
  deleteAllBtn.classList.add('hidden')
  listTodo.classList.add('hidden')
  menuCreat.classList.remove('hidden')
}


