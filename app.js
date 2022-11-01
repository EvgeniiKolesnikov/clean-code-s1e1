const taskInput = document.getElementById("new-task");//Add a new task.
const addButton = document.querySelector(".todo__button_add");//first button
const incompleteTaskHolder = document.getElementById("incomplete-tasks");//ul of #incompleteTasks
const completedTasksHolder = document.getElementById("completed-tasks");//completed-tasks

// New task list item
const createNewTaskElement = function(taskString) {
    const listItem = document.createElement("li");      
    const checkBox = document.createElement("input");      // input (checkbox)
    const label = document.createElement("label");         // label
    const editInput = document.createElement("input");     // input (text)
    const editButton = document.createElement("button");   // edit button
    const deleteButton = document.createElement("button"); // delete button
    const deleteButtonImg = document.createElement("img"); // delete button image

    listItem.className = 'todo__item';  

    checkBox.className = "todo__checkbox";
    checkBox.type = "checkbox";

    label.className = 'todo__label todo__task';
    label.innerText = taskString;

    editInput.className = "todo__input todo__task";
    editInput.type = "text";

    editButton.className = 'todo__button todo__button_edit';
    editButton.innerText = "Edit";

    deleteButton.className = 'todo__button todo__button_delete';
    deleteButtonImg.className='todo__button-img todo__button-img_delete';
    deleteButtonImg.src='./remove.svg';
    deleteButtonImg.alt='remove icon';
    deleteButton.appendChild(deleteButtonImg);

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
}


const addTask = function(){
    if (!taskInput.value) return;

    console.log("Add Task...");
    const listItem = createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value="";
}

// Edit an existing task
const editTask = function (){
    console.log("Edit Task... Change 'edit' to 'save'");
    const listItem = this.parentNode;
    const editInput = listItem.querySelector(".todo__input");
    const label = listItem.querySelector(".todo__label");
    const editBtn = listItem.querySelector(".todo__button_edit");
    const containsClass = listItem.classList.contains("edit-mode");

    if (containsClass) {
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }
    listItem.classList.toggle("edit-mode");
};

const deleteTask = function () {
    // console.log("Delete Task...");
    const listItem = this.parentNode;
    const ul = listItem.parentNode;
    ul.removeChild(listItem);
}

const taskCompleted = function(){
    // console.log("Complete Task...");
    const listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

const taskIncomplete = function () {
    // console.log("Incomplete Task...");
    const listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

const ajaxRequest = function () {
    // console.log("AJAX Request");
}

addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

const bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
    const checkBox = taskListItem.querySelector(".todo__checkbox");
    const editButton = taskListItem.querySelector(".todo__button_edit");
    const deleteButton = taskListItem.querySelector(".todo__button_delete");

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
    console.log("bind item", taskListItem);
}

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}