export interface TodoData {
  id: number
  title: string
  content?: string
  due_date?: string
  done: boolean
}

export interface contentTodoData {
  title: string
  content?: string
  due_date?: string
  done: boolean
}

export interface CategoryData {
  id: number
  title: string
  color: string
}

export interface contentCategoryData {
  title: string
  color: string
}


export interface categoryTodo {
  category_id: number,
  todo_id: number
}