// Select DOM Elements
const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');
const emptyState = document.getElementById('empty-state');
const itemsLeft = document.getElementById('items-left');
const clearCompletedBtn = document.getElementById('clear-completed');
const filterBtns = document.querySelectorAll('.filter-btn');

// Load saved todos from localStorage (each todo has a stable unique id)
let todos = loadTodos();
let currentFilter = 'all'; // 'all' | 'active' | 'completed'

function loadTodos() {
    try {
        const saved = localStorage.getItem('todos');
        const parsed = saved ? JSON.parse(saved) : [];
        // Backfill ids for any legacy data that doesn't have one
        return parsed.map(t => ({
            id: t.id ?? generateId(),
            text: t.text,
            completed: !!t.completed
        }));
    } catch {
        return [];
    }
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getVisibleTodos() {
    if (currentFilter === 'active') return todos.filter(t => !t.completed);
    if (currentFilter === 'completed') return todos.filter(t => t.completed);
    return todos;
}

// Create a DOM node for a single todo object
function createTodoNode(todo) {
    const li = document.createElement('li');
    li.className = 'todo-item';

    // Checkbox to toggle completion
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    checkbox.checked = todo.completed;
    checkbox.setAttribute('aria-label', 'Mark todo complete');

    checkbox.addEventListener('change', () => {
        todo.completed = checkbox.checked;
        saveTodos();
        render();
    });

    // Text of the todo
    const textSpan = document.createElement('span');
    textSpan.className = 'todo-text' + (todo.completed ? ' completed' : '');
    textSpan.textContent = todo.text;
    textSpan.title = 'Double-click to edit';

    // Double-click to edit todo inline
    textSpan.addEventListener('dblclick', () => startEditing(li, todo, textSpan));

    // Delete todo button
    const delBtn = document.createElement('button');
    delBtn.className = 'delete-btn';
    delBtn.innerHTML = '&#10005;';
    delBtn.setAttribute('aria-label', 'Delete todo');

    delBtn.addEventListener('click', () => {
        todos = todos.filter(t => t.id !== todo.id);
        saveTodos();
        render();
    });

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delBtn);

    return li;
}

// Replace the text span with an editable input
function startEditing(li, todo, textSpan) {
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.className = 'todo-edit-input';
    editInput.value = todo.text;
    editInput.maxLength = 200;

    li.replaceChild(editInput, textSpan);
    editInput.focus();
    editInput.setSelectionRange(editInput.value.length, editInput.value.length);

    const finishEdit = (commit) => {
        if (commit) {
            const trimmed = editInput.value.trim();
            if (trimmed) {
                todo.text = trimmed;
                saveTodos();
            }
        }
        render();
    };

    editInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') finishEdit(true);
        if (e.key === 'Escape') finishEdit(false);
    });

    editInput.addEventListener('blur', () => finishEdit(true));
}

// Render the whole todo list based on the current filter
function render() {
    list.innerHTML = '';

    const visible = getVisibleTodos();

    visible.forEach(todo => {
        list.appendChild(createTodoNode(todo));
    });

    emptyState.classList.toggle('visible', visible.length === 0);
    if (todos.length === 0) {
        emptyState.textContent = 'Nothing here yet — add your first todo above ✨';
    } else if (visible.length === 0) {
        emptyState.textContent = currentFilter === 'active'
            ? 'No active todos — nice work!'
            : 'No completed todos yet';
    }

    const remaining = todos.filter(t => !t.completed).length;
    itemsLeft.textContent = `${remaining} item${remaining === 1 ? '' : 's'} left`;
}

// Add a new todo
function addTodo() {
    const text = input.value.trim();

    if (!text) return;

    todos.push({
        id: generateId(),
        text: text,
        completed: false
    });

    input.value = '';

    saveTodos();
    render();
    input.focus();
}

// Event listeners
addBtn.addEventListener('click', addTodo);

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTodo();
});

clearCompletedBtn.addEventListener('click', () => {
    todos = todos.filter(t => !t.completed);
    saveTodos();
    render();
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        render();
    });
});

// Initial render
render();
