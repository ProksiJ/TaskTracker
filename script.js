"use strict";
const currentTasks = document.getElementById("currentTasks");
const completedTasks = document.getElementById("completedTasks");
const inputText = document.getElementById("inputText");
const inputTitle = document.getElementById("inputTitle");
const sortButtons = document.getElementById("sortButtons");
const addTaskForm = document.getElementById("addTaskForm");
const titleToDo = document.getElementById('toDo')

let currentTasksArray, completedTasksArray
window.addEventListener('DOMContentLoaded', (event) => {
 currentTasksArray = localStorage.getItem("currentTasks")
  ? JSON.parse(localStorage.getItem("currentTasks"))
  : [];

 completedTasksArray = localStorage.getItem("completedTasks")
  ? JSON.parse(localStorage.getItem("completedTasks"))
  : [];
console.log(currentTasksArray);

if (currentTasksArray.length > 0) {
  /* titleToDo.innerText = titleToDo.innerText + ` (${currentTasksArray.length})` */
  currentTasksArray.map((task) => {
    currentTasks.insertAdjacentHTML("beforeend", taskTemplate(task));
  });
}

if (completedTasksArray) {
  completedTasksArray.map((task) => {
    completedTasks.insertAdjacentHTML("beforeend", taskTemplate(task));
  });
}
});


addTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(addTaskForm);
  const data = Object.fromEntries(formData);
  data.id = Date.now();
  currentTasksArray.push(data);
  localStorage.setItem("currentTasks", JSON.stringify(currentTasksArray));
  currentTasks.insertAdjacentHTML("beforeend", taskTemplate(data));
  addTaskForm.reset();
  $("#exampleModal").modal("hide");
});

currentTasks.addEventListener("click", (e) => {
  let task = e.target.closest("li");
  if (e.target.className === "btn btn-danger w-100") {
    task.remove();
    currentTasksArray = currentTasksArray.filter(
      (element) => element.id != task.id
    );
    localStorage.setItem("currentTasks", JSON.stringify(currentTasksArray));
  }
  if (e.target.className === "btn btn-success w-100") {
    task.remove();
    completedTasksArray.push(currentTasksArray.find(element => element.id == task.id));
    currentTasksArray = currentTasksArray.filter(
      (element) => element.id != task.id
    );
    localStorage.setItem("currentTasks", JSON.stringify(currentTasksArray));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasksArray));
    completedTasks.insertAdjacentElement("beforeend", task);
  }
  if (e.target.className === "btn btn-info w-100 my-2") {
     $("#exampleModal").modal("show");
    inputTitle.value = task.getElementsByTagName("h5")[0].innerText;
    inputText.value = task.getElementsByTagName("p")[0].innerText;
  }
});

completedTasks.addEventListener("click", (e) => {
  let task = e.target.closest("li");
  if (e.target.className === "btn btn-danger w-100") {
    task.remove();
    completedTasksArray = completedTasksArray.filter(
      (element) => element.id != task.id
    );
    localStorage.setItem("currentTasks", JSON.stringify(completedTasksArray));
  }
  if (e.target.className === "btn btn-success w-100") {
    
  }
});

function getDate() {
  const date = new Date();
  const dd = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
  const mm =
    date.getMonth() > 8 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
  const hours = date.getHours() > 9 ? date.getHours() : "0" + date.getHours();
  const min =
    date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();
  return hours + ":" + min + " " + dd + "." + mm + "." + date.getFullYear();
}

function taskTemplate(data) {
  return `<li class="list-group-item d-flex w-100 mb-2" id=${data.id}>
    <div class="w-100 mr-2">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">${data.title}</h5>
        <div>
          <small class="mr-2">${data.priority} priority</small>
          <small>${getDate()}</small>
        </div>
      </div>
      <p class="mb-1 w-100">
        ${data.text}
      </p>
    </div>
    <div class="dropdown m-2 dropleft">
      <button
        class="btn btn-secondary h-100"
        type="button"
        id="dropdownMenuItem1"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i class="fas fa-ellipsis-v"></i>
      </button>
      <div
        class="dropdown-menu p-2 flex-column"
        aria-labelledby="dropdownMenuItem1"
      >
        <button type="button" class="btn btn-success w-100">
          Complete
        </button>
        <button type="button" class="btn btn-info w-100 my-2">
          Edit
        </button>
        <button type="button" class="btn btn-danger w-100">
          Delete
        </button>
      </div>
    </div>
    </li>`;
}
