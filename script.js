// Main Logic Script

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const progressTracker = document.getElementById('progressTracker');

function updateLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateProgress() {
  const total = tasks.length;
  const completed = tasks.filter(task => task.status === 'Completed').length;
  progressTracker.textContent = `Progress: ${completed} of ${total} tasks completed`;

}

function createTaskElement(task, index) {
  const taskEl = document.createElement('div');
  taskEl.className = 'task';
  if (task.status === 'Completed') taskEl.classList.add('completed');

  taskEl.innerHTML = `
    <h3>${task.title}</h3>
    <p><strong>Employee:</strong> ${task.employee}</p>
    <p><strong>Due:</strong> ${task.dueDate}</p>
    <p class="status">Status: ${task.status}</p>
    <p class="priority-${task.priority}"><strong>Priority:</strong> ${task.priority}</p>
  `;

  if (task.status === 'Assigned') {
    const acceptBtn = document.createElement('button');
    acceptBtn.textContent = 'Accept Task';
    acceptBtn.className = 'accept-btn';
    acceptBtn.onclick = () => {
      task.status = 'Accepted';
      updateLocalStorage();
      renderTasks();
    };
    taskEl.appendChild(acceptBtn);
  }

  if (task.status === 'Accepted') {
    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Mark as Completed';
    completeBtn.className = 'complete-btn';
    completeBtn.onclick = () => {
      task.status = 'Completed';
      updateLocalStorage();
      renderTasks();
    };
    taskEl.appendChild(completeBtn);
  }

  return taskEl;
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, i) => {
    const el = createTaskElement(task, i);
    taskList.appendChild(el);
  });
  updateProgress();
}

taskForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const employee = document.getElementById('employeeName').value;
  const title = document.getElementById('taskTitle').value;
  const dueDate = document.getElementById('dueDate').value;
  const priority = document.getElementById('priority').value;

  const newTask = {
    employee,
    title,
    dueDate,
    priority,
    status: 'Assigned'
  };

  tasks.push(newTask);
  updateLocalStorage();
  renderTasks();

  taskForm.reset();
});

function toggleDarkMode() {
  document.body.classList.toggle('dark');
}

// Initial render
renderTasks();

  