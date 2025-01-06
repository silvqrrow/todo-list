import { displayProjects, displayTasks } from "./domManipulation";

const initializeProjectButtonLogic = (controller) => {
  const addProjectButton = document.getElementById("add-project");
  const projectDialog = document.querySelector(".project-dialog");
  const addProjectForm = document.querySelector(".add-project-form");
  const cancelButton = document.getElementById("project-cancel-button");

  addProjectButton.addEventListener("click", function () {
    projectDialog.showModal();
  });

  addProjectForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const projectTitle = addProjectForm.title.value;
    controller.addProject(projectTitle);
    projectDialog.close();
    addProjectForm.reset();
    displayProjects(controller);
  });

  cancelButton.addEventListener("click", function () {
    projectDialog.close();
    addProjectForm.reset();
  });
};

const initializeTaskButtonLogic = (controller) => {
  const addTaskButton = document.getElementById("add-task");
  const projectSelect = document.getElementById("project");
  const datePickerId = document.getElementById("dueDate");
  datePickerId.min = new Date().toLocaleDateString("fr-ca");
  // do below
  const taskDialog = document.querySelector(".task-dialog");
  const addTaskForm = document.querySelector(".add-task-form");
  const cancelButton = document.getElementById("task-cancel-button");

  addTaskButton.addEventListener("click", function () {
    const projects = controller.getProjects();
    for (let i = 0; i < projects.length; i++) {
      const option = document.createElement("option");
      option.value = projects[i].title;
      option.textContent = projects[i].title;
      projectSelect.appendChild(option);
    }
    taskDialog.showModal();
  });

  addTaskForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const taskTitle = addTaskForm.title.value;
    const taskDescription = addTaskForm.description.value;
    const taskdueDate = addTaskForm.dueDate.value;
    const taskPriority = addTaskForm.priority.value;
    const taskProject = addTaskForm.project.value;
    controller.addTask(
      taskTitle,
      taskDescription,
      taskdueDate,
      taskPriority,
      taskProject
    );
    taskDialog.close();
    projectSelect.replaceChildren();
    addTaskForm.reset();

    const projectForDisplay = controller.searchForProject(taskProject);
    displayTasks(projectForDisplay, controller);
  });

  cancelButton.addEventListener("click", function () {
    taskDialog.close();
    addTaskForm.reset();
  });
};

export { initializeProjectButtonLogic, initializeTaskButtonLogic };
