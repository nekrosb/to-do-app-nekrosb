import { todos } from './storage'

export const errorMsg = (errorMsg: HTMLParagraphElement): void => {
  let n = 0
  todos.forEach((todo): void => {
    if (!todo.due_date) return
    const selectedDate = new Date(todo.due_date)
    const today = new Date()

    selectedDate.setHours(0, 0, 0, 0)
    today.setHours(0, 0, 0, 0)
    const difdays = Math.floor(
      (selectedDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    )
    if (difdays < 0 && todo.done === false) {
      n += 1
    }
  })

  if (n > 0) {
    errorMsg.classList.remove('hidden')
  } else {
    errorMsg.classList.add('hidden')
  }
}

