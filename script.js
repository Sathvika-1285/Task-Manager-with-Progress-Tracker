let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      <div class="task-main">
        <span><span class="category ${task.category}">${task.category}</span> ${task.name}</span>
        <div class="task-actions">
          <button onclick="toggleTask(${index})">✔️</button>
          <button onclick="editTask(${index})">✏️</button>
          <button onclick="deleteTask(${index})">❌</button>
        </div>
      </div>
      <div class="due-date">Due: ${task.dueDate || "No date"}</div>
    `;
    taskList.appendChild(li);
  });
  updateProgress();
}

function addTask() {
  const input = document.getElementById("taskInput");
  const category = document.getElementById("taskCategory").value;
  const dueDate = document.getElementById("taskDate").value;
  if (input.value.trim() === "") return;
  tasks.push({ name: input.value, category: category, dueDate: dueDate, completed: false });
  input.value = "";
  document.getElementById("taskDate").value = "";
  saveTasks();
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const newName = prompt("Edit task:", tasks[index].name);
  if (newName !== null && newName.trim() !== "") {
    tasks[index].name = newName;
    saveTasks();
    renderTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function updateProgress() {
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const percent = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  document.getElementById("progress").style.width = percent + "%";
  document.getElementById("progressText").innerText = `${percent}% Completed (${completedTasks}/${totalTasks})`;
}

// Initial render
renderTasks();
