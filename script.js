// =====================
// Select HTML elements
// =====================

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const clearBtn = document.getElementById("clearBtn");
const taskList = document.getElementById("taskList");
const errorMsg = document.getElementById("errorMsg");
const remainingCount = document.getElementById("remainingCount");
const counter = document.getElementById("counter");
const allDoneMsg = document.getElementById("allDoneMsg");
const colorCircles = document.querySelectorAll(".color-circle");

// =====================
// Store tasks
// =====================

let tasks = [];

// =====================
// Render tasks
// =====================

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

// =====================
// Update counter
// =====================

function updateCounter() {
  const remaining = tasks.filter((task) => !task.done).length;
  const completed = tasks.filter((task) => task.done).length;

  remainingCount.textContent = remaining;

  counter.innerHTML = `Tasks remaining: <span id="remainingCount">${remaining}</span><br>
        ${completed} of ${tasks.length} tasks completed`;

  if (tasks.length > 0 && remaining === 0) {
    counter.textContent = "🎉 All tasks done!";
    counter.classList.add("done");

    allDoneMsg.classList.add("visible");
  } else {
    counter.classList.remove("done");
    allDoneMsg.classList.remove("visible");
  }
}

// =====================
// Add task
// =====================

function addTask() {
  const text = taskInput.value.trim();

  errorMsg.textContent = "";

  if (text === "") {
    errorMsg.textContent = "Please type a task first";
    return;
  }

  const exists = tasks.some(
    (task) => task.text.toLowerCase() === text.toLowerCase(),
  );

  if (exists) {
    errorMsg.textContent = "This task already exists!";
    return;
  }

  tasks.push({
    text: text,
    done: false,
  });

  taskInput.value = "";

  renderTasks();
}

// =====================
// Event listeners
// =====================

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

clearBtn.addEventListener("click", () => {
  tasks = [];
  renderTasks();
});

// =====================
// Bonus - Color picker
// =====================

colorCircles.forEach((circle) => {
  circle.addEventListener("click", () => {
    document.body.style.backgroundColor = circle.dataset.color;

    colorCircles.forEach((c) => c.classList.remove("active"));

    circle.classList.add("active");
  });
});

// Initial render
renderTasks();
