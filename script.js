// Select DOM Elements
const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');

// Try to load saved todos from localStorage
const saved = localStorage.getItem('todos');
const todos = saved ? JSON.parse(saved) : [];

// Save todos to localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Create a DOM node for a todo object
function createTodoNode(todo, index) {
    const li = document.createElement('li');

    // Checkbox to toggle completion
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.completed;

    checkbox.addEventListener('change', () => {
        todo.completed = checkbox.checked;

        // Strike-through when completed
        textSpan.style.textDecoration =
            todo.completed ? 'line-through' : '';

        saveTodos();
    });

    // Text of the todo
    const textSpan = document.createElement('span');
    textSpan.textContent = todo.text;
    textSpan.style.margin = '0.8px';

    if (todo.completed) {
        textSpan.style.textDecoration = 'line-through';
    }

    // Double-click to edit todo
    textSpan.addEventListener('dblclick', () => {
        const newText = prompt('Edit todo', todo.text);

        if (newText !== null) {
            const trimmedText = newText.trim();

            if (trimmedText) {
                todo.text = trimmedText;
                textSpan.textContent = todo.text;
                saveTodos();
            }
        }
    });

    // Delete todo button
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';

    delBtn.addEventListener('click', () => {
        todos.splice(index, 1);
        saveTodos();
        render();
    });

    // Add elements to li
    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delBtn);

    // IMPORTANT: return the created li
    return li;
}

// Render the whole todo list
function render() {
    list.innerHTML = '';

    todos.forEach((todo, index) => {
        const node = createTodoNode(todo, index);
        list.appendChild(node);
    });
}

// Add a new todo
function addTodo() {
    const text = input.value.trim();

    if (!text) {
        return;
    }

    todos.push({
        text: text,
        completed: false
    });

    input.value = '';

    saveTodos();
    render();
}

// Add button event
addBtn.addEventListener('click', addTodo);

// Initial render
render();