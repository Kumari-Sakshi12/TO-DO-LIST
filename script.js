const inputBox = document.getElementById("todo-input");
const listContainer = document.getElementById("list-container");

const completedCounter = document.getElementById("completed-count");
const uncompletedCounter = document.getElementById("uncompleted-count");

function updateCounters() {
    const completedTasks = document.querySelectorAll("li.completed").length;
    const totalTasks = document.querySelectorAll("#list-container li").length;

    completedCounter.textContent = completedTasks;
    uncompletedCounter.textContent = totalTasks - completedTasks;
}

function addTask() {
    const task = inputBox.value.trim();

    if (!task) {
        alert("Please write down a task");
        return;
    }

    const li = document.createElement("li");

    li.innerHTML = `
        <label>
            <input type="checkbox">
            <span class="task-text">${task}</span>
        </label>
        <span class="edit-btn">Edit</span>
        <span class="delete-btn">Delete</span>
    `;

    const checkbox = li.querySelector("input");
    const editBtn = li.querySelector(".edit-btn");
    const deleteBtn = li.querySelector(".delete-btn");
    const taskSpan = li.querySelector(".task-text");

    checkbox.addEventListener("change", function () {
        li.classList.toggle("completed", checkbox.checked);
        updateCounters();
    });

    editBtn.addEventListener("click", function () {
        const updatedTask = prompt("Edit your task", taskSpan.textContent);

        if (updatedTask !== null && updatedTask.trim() !== "") {
            taskSpan.textContent = updatedTask.trim();
            li.classList.remove("completed");
            checkbox.checked = false;
            updateCounters();
        }
    });

    deleteBtn.addEventListener("click", function () {
        if (confirm("Are you sure you want to delete this task?")) {
            li.remove();
            updateCounters();
        }
    });

    listContainer.appendChild(li);
    inputBox.value = "";

    updateCounters();
}

document.getElementById("add-button").addEventListener("click", addTask);

inputBox.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

updateCounters();