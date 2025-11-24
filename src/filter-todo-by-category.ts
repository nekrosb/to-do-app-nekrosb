import {  categoryTodos } from "./storage";

export function filterTodoByCategory(categoryId: string, listTodo: HTMLDivElement): void {
const allTodos = listTodo.querySelectorAll<HTMLDivElement>(".todo")
if (categoryId === "0" || categoryId === "") {
    allTodos.forEach(todo => {
        todo.classList.remove("hidden")
    })
    return;
}

const todoInCategory = categoryTodos.filter(ct => ct.category_id === Number(categoryId)).map(ct => ct.todo_id);

allTodos.forEach(divTodo => {
    const todoId = Number(divTodo.dataset.todoId)
    if (todoInCategory.includes(todoId)) {
        divTodo.classList.remove("hidden")
    } else {
        divTodo.classList.add("hidden")
    }
})

}