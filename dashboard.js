/* =====================================
   DASHBOARD TASK MANAGER
===================================== */
// Task Manager Elements

const taskInput = document.getElementById("taskInput");
const priority = document.getElementById("priority");
const category = document.getElementById("category");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const searchTask = document.getElementById("searchTask");
if (searchTask) {

    searchTask.addEventListener("input", displayTasks);

}
let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];
if(addTaskBtn){

    addTaskBtn.addEventListener("click", addTask);

}
function addTask() {

    const title = taskInput.value.trim();

    if (title === "") {

        alert("Please enter a task.");

        return;

    }

    const task = {

        title: title,

        priority: priority.value,

        category: category.value,

        completed: false,

        createdAt: new Date().toLocaleString()

    };

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();

    console.log(tasks);

    taskInput.value = "";

}
function displayTasks() {

   taskList.innerHTML = "";

const searchValue = searchTask.value.toLowerCase();

tasks.forEach((task, index) => {

    if (!task.title.toLowerCase().includes(searchValue)) {
        return;
    }
        taskList.innerHTML += `

        <div class="task-card">

            <div class="task-header">

               <h3 class="${task.completed ? 'completed-task' : ''}">
    <input
        type="checkbox"
        ${task.completed ? "checked" : ""}
        onchange="toggleTask(${index})"
    >
    ${task.title}
</h3>

                <span class="priority ${task.priority.toLowerCase()}">
                    ${task.priority}
                </span>

            </div>

            <p><strong>Category:</strong> ${task.category}</p>

            <p><strong>Created:</strong> ${task.createdAt}</p>

            <div class="task-actions">

               <button onclick="editTask(${index})">Edit</button>

              <button onclick="deleteTask(${index})">Delete</button>

            </div>

        </div>

        `;

    });

}
displayTasks();
function deleteTask(index) {

    tasks.splice(index, 1);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();

}
function editTask(index) {

    let newTitle = prompt("Edit your task:", tasks[index].title);

    if (newTitle === null || newTitle.trim() === "") {
        return;
    }

    tasks[index].title = newTitle.trim();

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();

}
function toggleTask(index) {

    tasks[index].completed = !tasks[index].completed;

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();

}