import type {
  CategoryData,
  categoryTodo,
  contentCategoryData,
  contentTodoData,
  TodoData,
} from './types'

const API_URL = 'https://api.todos.in.jt-lab.ch/todos'
const api_categories_url = 'https://api.todos.in.jt-lab.ch/categories'
const api_category_todo = 'https://api.todos.in.jt-lab.ch/categories_todos'

// work with todos

export async function fetchTodos(): Promise<TodoData[]> {
  const response = await fetch(API_URL)
  if (!response.ok) {
    throw new Error('Failed to fetch todos from API')
  }
  return response.json()
}

export async function postTodo(todo: contentTodoData): Promise<TodoData> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify(todo),
  })
  if (!response.ok) {
    throw new Error('Failed to post todo to API')
  }

  const t = await response.json()

  return t[0]
}

export async function deleteTodoFromAPI(id: number): Promise<void> {
  const response = await fetch(`${API_URL}?id=eq.${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Failed to delete todo from API')
  }
}

export async function updateTodoInAPI(todo: TodoData): Promise<void> {
  const response = await fetch(`${API_URL}?id=eq.${todo.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      done: todo.done,
    }),
  })
  if (!response.ok) {
    throw new Error('Failed to update todo in API')
  }
}

export async function deleteAllApiTodos(): Promise<void> {
  const response = await fetch(API_URL, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Failed to delete all todos from API')
  }
}

// work with categories

export async function fetchCategories(): Promise<CategoryData[]> {
  try {
    const response = await fetch(api_categories_url)
    return response.json()
  } catch (error) {
    alert('you have problem with internet connection')
    throw new Error(`Failed to fetch categories from API ${error}`)
  }
}

export async function postCategory(
  category: contentCategoryData,
): Promise<CategoryData> {
  try {
    const response = await fetch(api_categories_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify(category),
    })
    const newCategory = await response.json()
    return newCategory[0]
  } catch (error) {
    alert('you have problem with internet connection')
    throw new Error(`Failed to post category to API ${error}`)
  }
}

export async function deleteCategoryFromAPI(id: number): Promise<void> {
  try {
    await fetch(`${api_categories_url}?id=eq.${id}`, {
      method: 'DELETE',
    })
  } catch (error) {
    alert('you have problem with internet connection')
    throw new Error(`Failed to delete category from API ${error}`)
  }
}

export async function updateCategoryInAPI(
  category: CategoryData,
): Promise<void> {
  try {
    await fetch(`${api_categories_url}?id=eq.${category.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: category.title,
        color: category.color,
      }),
    })
  } catch (error) {
    alert('you have problem with internet connection')
    throw new Error(`Failed to update category in API ${error}`)
  }
}

// work with category_todo

export async function fetchCategoryTodo(): Promise<categoryTodo[]> {
  try {
    const response = await fetch(api_category_todo)
    return response.json()
  } catch {
    alert('you have problem with internet connection')
    throw new Error()
  }
}

export async function postCategoryTodo(
  categoryTodoItem: categoryTodo,
): Promise<void> {
  try {
    await fetch(api_category_todo, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryTodoItem),
    })
  } catch {
    alert('you have problem with internet connection')
    throw new Error()
  }
}

export async function deleteCategoryTodoFromAPIFromTodo(
  id: number,
): Promise<void> {
  try {
    await fetch(`${api_category_todo}?todo_id=eq.${id}`, {
      method: 'DELETE',
    })
  } catch {
    alert('you have problem with internet connection')
    throw new Error()
  }
}

export async function deleteCategoryTodoFromAPIFromCategory(
  id: number,
): Promise<void> {
  try {
    await fetch(`${api_category_todo}?category_id=eq.${id}`, {
      method: 'DELETE',
    })
  } catch {
    alert('you have problem with internet connection')
    throw new Error()
  }
}

export async function deleteAllCategoryTodos(): Promise<void> {
  try {
    await fetch(api_category_todo, {
      method: 'DELETE',
    })
  } catch {
    alert('you have problem with internet connection')
    throw new Error()
  }
}
