// Select HTML elements

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const clearBtn = document.getElementById("clearBtn");
const taskList = document.getElementById("taskList");
const errorMsg = document.getElementById("errorMsg");
const remainingCount = document.getElementById("remainingCount");
const counter = document.getElementById("counter");
const allDoneMsg = document.getElementById("allDoneMsg");
const colorCircles = document.querySelectorAll(".color-circle");

// Store tasks
let tasks = [];

// Render tasks
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task-item";

    if (task.done) {
      li.classList.add("done");
    }

    li.innerHTML = `
            <span class="task-text">${task.text}</span>
            <button class="done-btn">Done</button>
            <button class="delete-btn">Delete</button>
        `;

    // Done button
    li.querySelector(".done-btn").addEventListener("click", () => {
      tasks[index].done = !tasks[index].done;
      renderTasks();
    });

    // Delete button
    li.querySelector(".delete-btn").addEventListener("click", () => {
      tasks.splice(index, 1);
      renderTasks();
    });

    taskList.appendChild(li);
  });

  updateCounter();
}
