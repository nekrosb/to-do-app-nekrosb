import "./style.css";

console.log("Hello from typescript");

const listTodo = document.querySelector("#todo-list") as HTMLDivElement;
const menuCreat = document.querySelector("#creat-todo") as HTMLDivElement;
const addNewTodoBtn = document.querySelector(
    "#add-new-todo-btn",
) as HTMLButtonElement;
const titelInput = document.querySelector("#todo-input") as HTMLInputElement;
const plusBtn = document.querySelector(".add-btn") as HTMLButtonElement;
menuCreat.classList.add("hidden");

const hiddenMainMenu = (): void => {
    plusBtn.classList.add("hidden");
    listTodo.classList.add("hidden");
    menuCreat.classList.remove("hidden");
};

const creatNewToDo = (): void => {
    if (titelInput.value !== "") {
    const newDiv = document.createElement("div") as HTMLDivElement;
    newDiv.classList.add("todo");
    const p = document.createElement("p") as HTMLParagraphElement;
    p.textContent = titelInput.value;
    newDiv.appendChild(p);
    listTodo.appendChild(newDiv);
    titelInput.value = "";
        plusBtn.classList.remove("hidden");
    listTodo.classList.remove("hidden");
    menuCreat.classList.add("hidden");
    }
    else {
        alert("you forget sam sings")
    }
};

plusBtn.addEventListener("click", hiddenMainMenu);

addNewTodoBtn.addEventListener("click", () => {
    creatNewToDo();
});

titelInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        creatNewToDo()
    }
})