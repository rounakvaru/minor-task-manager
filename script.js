
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const emptyMessage = document.getElementById('emptyMessage');

let tasks = [];

function renderTasks() {
  taskList.innerHTML = '';

  if (tasks.length === 0) {
    emptyMessage.style.display = 'block';
  } else {
    emptyMessage.style.display = 'none';
  }

  tasks.forEach(function (task, index) {
    const li = document.createElement('li');
    li.className = 'task-item' + (task.completed ? ' completed' : '');

    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = task.text;

    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'task-buttons';

    const completeBtn = document.createElement('button');
    completeBtn.className = 'complete-btn';
    completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
    completeBtn.addEventListener('click', function () {
      toggleComplete(index);
    });


    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', function () {
      deleteTask(index);
    });


    buttonsDiv.appendChild(completeBtn);
    buttonsDiv.appendChild(deleteBtn);
    li.appendChild(span);
    li.appendChild(buttonsDiv);
    taskList.appendChild(li);
  });
}


function addTask() {
  const text = taskInput.value.trim();

  if (text === '') {
    return;
  }

  tasks.push({ text: text, completed: false });
  taskInput.value = '';
  taskInput.focus();
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

addTaskBtn.addEventListener('click', addTask);

taskInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    addTask();
  }
});

renderTasks();
