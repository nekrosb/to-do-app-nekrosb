import type { contentTodoData, TodoData  } from "./types"

const API_URL = "https://api.todos.in.jt-lab.ch/todos"

export async function fetchTodos(): Promise<TodoData[]> {
  const response = await fetch(API_URL)
  if (!response.ok) {
    throw new Error("Failed to fetch todos from API")
  }
  return response.json()
}

export async function postTodo(todo: contentTodoData): Promise<TodoData> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(todo),
  })
  if (!response.ok) {
    throw new Error("Failed to post todo to API")
  }
  

  const t = await response.json()
  console.log(t);
  
  return t[0]
}

export async function deleteTodoFromAPI(id: number): Promise<void> {
  const response = await fetch(`${API_URL}?id=eq.${id}`, {
    method: "DELETE",
  })
  if (!response.ok) {
    throw new Error("Failed to delete todo from API")
  }
}

export async function updateTodoInAPI(todo: TodoData): Promise<void> {
  const response = await fetch(`${API_URL}?id=eq.${todo.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      done: todo.done
    }),
  })
  if (!response.ok) {
    console.log(response.status);
    
    throw new Error("Failed to update todo in API")
  }
  
}

export async function deleteAllApiTodos(): Promise<void> {
  const response = await fetch(API_URL, {
    method: "DELETE",
  })
  if (!response.ok) {
    throw new Error("Failed to delete all todos from API")
  }
}
