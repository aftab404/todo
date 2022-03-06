// Selectors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
const todoEditSave = document.querySelector('.todo-edit-save')

// Event Listeners

document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);



// Functions

function addTodo(event) {
    event.preventDefault();
    if (todoInput.value.trim() != "") {
        // TodoDiv
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        // Create LI
        const newTodo = document.createElement('li');
        newTodo.innerText = todoInput.value.trim();
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        // Add to Local Storage
        saveLocalTodos(todoInput.value.trim());
        // Checkmark Button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);
        // Trash Button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
        // Edit Button
        const editButton = document.createElement('button');
        editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
        editButton.classList.add('edit-btn');
        todoDiv.appendChild(editButton);
        // Append to List
        todoList.appendChild(todoDiv);
        // Clear Input Box
        todoInput.value = "";
    }
}

function deleteCheck(e) {
    const item = e.target;
    // Delete Todo
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();

        })
    }

    // Checkmark

    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }

    // Edit Todo

    if (item.classList[0] === 'edit-btn') {
        const todo = item.parentElement;
        todoInput.value = todo.innerText;
        todoInput.style.border = "solid 0.5mm rgba(0, 153, 255, 0.699)";
        todoInput.focus();
        todoButton.style.display = "none";
        todoEditSave.style.display = "block";
        todoEditSave.addEventListener('click', function (e){ 
        const todoEdited = todoInput.value;
        const todoOld = todo.childNodes[0].innerText;
        todo.childNodes[0].innerText = todoEdited;
        editLocalTodos(todoEdited, todoOld);


    })


}
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "deleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;

        }
    });
}


// Local Storage

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function editLocalTodos(todoEdited, todoOld) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.splice(todos.indexOf(todoOld), 1, todoEdited)
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function (todo) {
        // TodoDiv
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        // Create LI
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        // Checkmark Button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);
        // Trash Button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
        // Edit Button
        const editButton = document.createElement('button');
        editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
        editButton.classList.add('edit-btn');
        todoDiv.appendChild(editButton);
        // Append to List
        todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.splice(todos.indexOf(todo.innerText), 1);
    localStorage.setItem('todos', JSON.stringify(todos));

}

todoInput.value = "";
