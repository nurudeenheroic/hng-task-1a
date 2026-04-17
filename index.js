let deleteButton = document.querySelector('.delete-button');
let editButton = document.querySelector('.edit-button');
let saveButton = document.querySelector('.save-button');
let cancelButton = document.querySelector('.cancel-button');
let description = document.querySelector('.description');
let priority = document.querySelector('.priority');
let cardContainer = document.querySelector('.card-container');
let card =  document.querySelector('.card');
let editForm = document.querySelector('.edit-form-container');
let titleInput = document.querySelector('.title-input');
let descriptionInput = document.querySelector('.description-input');
let priorityInput = document.querySelector('.priority-input');
let dueDateInput = document.querySelector('.due-date-input');
let dueDate = document.querySelector('.due-date');
let dueTime = document.querySelector('.due-time');
let title = document.querySelector('.task-title');
let status = document.querySelector('.status');
let priorityIndicator = document.querySelector('.priority-indicator');
let collapseButton = document.querySelector('.collapse-button');
let checkBox = document.querySelector('.checkbox');
checkBox.addEventListener("change", () => {
    if (checkBox.checked) {
        status.value = "Done";
        statusChangeEffect();
    } else {
        status.value = "Pending";
        statusChangeEffect();
    }
});
deleteButton.addEventListener("click" , () => {
    alert('Delete button clicked');
});
editButton.addEventListener("click" , () => {
    card.style.display = "none";
    editForm.style.display ="flex";
    titleInput.value = title.innerText;
    descriptionInput.value = description.innerText;
    priorityInput.value = priority.innerText;
    
});
cancelButton.addEventListener("click" , (event) => {
    event.preventDefault();
    card.style.display = "flex";
    editForm.style.display ="none";
});
saveButton.addEventListener("click" , (event) => {
    event.preventDefault();
    title.innerText = titleInput.value;
    description.innerText = descriptionInput.value;
    priority.innerText = priorityInput.value;
    card.style.display = "flex";
    editForm.style.display ="none";
    editChangeEffect();
    updateDescriptionCollapse();
});
status.addEventListener("change", () => {
    statusChangeEffect();
});

collapseButton.addEventListener("click", () => {
    const expanded = collapseButton.dataset.expanded === 'true';
    collapseButton.dataset.expanded = expanded ? 'false' : 'true';
    updateDescriptionCollapse();
});
if (!description.id) {
    description.id = 'description-content';
}
collapseButton.setAttribute('aria-controls', description.id);
collapseButton.dataset.expanded = collapseButton.dataset.expanded || 'false';dueDateInput.valueAsDate = new Date("April 18, 2026");
dueDateInput.addEventListener("change" , () => {
     document.querySelector('.due-date-edit-display').innerText = `Selected Due Date: ${dueDateInput.valueAsDate.toDateString()}`;
     dueDateInput.innerText = `${dueDateInput.valueAsDate.toDateString()}`;
});
function statusChangeEffect() {
    if (status.value === "Done") {
        status.style.backgroundColor = "green";
        status.style.color = "white";
        checkBox.checked = true;
        title.innerHTML = `<strike>${title.textContent}</strike>`;
        title.style.color = "gray";
        dueTime.innerText = "Time remaining: Completed";
    } else if (status.value === "Pending") {
        status.style.backgroundColor = "orange";
        status.style.color = "white";
        title.style.color = "black";
        checkBox.checked = false;
        title.innerHTML = title.textContent;
    } else if (status.value === "In Progress") {
        status.style.backgroundColor = "blue";
        status.style.color = "white";
        title.innerHTML = title.textContent;
        title.style.color = "black";
        checkBox.checked = false;

    }
}

function updateDescriptionCollapse() {
    const lineHeight = parseFloat(getComputedStyle(description).lineHeight) || 24;
    const maxVisibleHeight = lineHeight * 2;
    const needsCollapse = description.scrollHeight > maxVisibleHeight + 1;
    const expanded = collapseButton.dataset.expanded === 'true';

    if (!needsCollapse) {
        description.classList.remove('collapsed');
        collapseButton.style.display = 'none';
        return;
    }

    collapseButton.style.display = 'inline-block';
    collapseButton.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    if (expanded) {
        description.classList.remove('collapsed');
        collapseButton.textContent = 'Show less';
    } else {
        description.classList.add('collapsed');
        collapseButton.textContent = 'Show more';
    }
}

function editChangeEffect() {
const now = new Date();
const initialDueDate = dueDateInput.valueAsDate || new Date("April 18, 2026");
const diffMs = dueDateInput.valueAsDate - now;
const absMinutes = Math.floor(Math.abs(diffMs) / (1000 * 60));
const days = Math.floor(absMinutes / (60 * 24));
const hours = Math.floor((absMinutes % (60 * 24)) / 60);
const minutes = absMinutes % 60;
    if (priority.innerText === "Medium") {
        priorityIndicator.style.backgroundColor = "orange";
    } else if (priority.innerText === "High") {
        priorityIndicator.style.backgroundColor = "red";
    } else {
        priorityIndicator.style.backgroundColor = "green";
    };
    dueDate.innerText = dueDateInput.valueAsDate ? `Due Date: ${dueDateInput.valueAsDate.toDateString()}` : "Due Date: April 18,2026";
    if (dueDateInput.valueAsDate) {

        if (diffMs < 0) {
            dueDate.style.color = "red";
            dueTime.style.color = "";
            dueTime.innerHTML = `Time remaining: <span style="color: red;" data-testid="test-todo-overdue-indicator">Overdue</span> by ${days} days, ${hours} hours, ${minutes} minutes`;
        } else {
            dueDate.style.color = "green";
            dueTime.style.color = "";
            dueTime.innerText = `Time remaining: ${days} days, ${hours} hours, ${minutes} minutes`;
        }
    } else {
        dueDate.style.color = "";
        dueTime.style.color = "";
        dueTime.innerText = "Time remaining: N/A";
    }
}

statusChangeEffect();
editChangeEffect();
updateDescriptionCollapse();
setInterval(editChangeEffect, 60_000);