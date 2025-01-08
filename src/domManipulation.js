import { format, parseISO } from "date-fns";
import completedSound from "./sounds/completed.mp3";

const displayProjects = (controller) => {
  const projectContainer = document.querySelector(".project-list");
  projectContainer.replaceChildren();
  controller.getProjects().forEach((project, index) => {
    if (project.getTitle() === "Inbox") return; // Skip "Inbox" project

    const projectTab = document.createElement("button");
    projectTab.classList.add("btn-projects");
    projectTab.classList.add("tab");
    projectTab.setAttribute("data-index", index);

    // Set text for tab
    projectTab.textContent = project.getTitle();
    projectTab.addEventListener("click", function () {
      displayTasks(project, controller);
    });

    const icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-trash-can");
    icon.addEventListener("click", function () {
      removeProject(index, controller);
    });
    projectTab.appendChild(icon);
    projectContainer.appendChild(projectTab);
  });
};

const removeProject = (index, controller) => {
  controller.removeProject(index);
  displayProjects(controller);
};

const displayTasks = (project, controller) => {
  if (project.getTitle() === "Inbox") return; // Skip "Inbox" project

  const completeSound = new Audio(completedSound);

  const projectTitle = project.getTitle();
  const tasks = controller.getTasks(projectTitle);
  const contentContainer = document.querySelector(".content");

  contentContainer.replaceChildren();

  const projectHeading = document.createElement("h1");
  projectHeading.textContent = projectTitle;
  contentContainer.append(projectHeading);

  // Create and append taskContainer
  const taskContainer = document.createElement("div");
  taskContainer.classList.add("task-container");
  contentContainer.append(taskContainer);

  tasks.forEach((task, index) => {
    const taskTab = document.createElement("div");
    taskTab.classList.add("task-tab");
    taskTab.setAttribute("data-index", index);

    const taskControls = document.createElement("div");
    taskControls.classList.add("task-controls");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add(`${task.getPriority()}`);
    checkbox.classList.add("checkbox");
    taskControls.appendChild(checkbox);

    const editIcon = document.createElement("i");
    editIcon.classList.add("fas", "fa-edit", "edit-icon");
    taskControls.appendChild(editIcon);

    taskTab.appendChild(taskControls);
    const textContainer = document.createElement("div");
    textContainer.classList.add("text-container");

    const taskTitle = document.createElement("p");
    taskTitle.classList.add("task-title");
    taskTitle.textContent = task.getTitle();
    textContainer.appendChild(taskTitle);

    const taskDueDate = document.createElement("p");
    taskDueDate.classList.add("task-due-date");
    const dueDate = parseISO(task.getDueDate());
    const formattedDate =
      dueDate.getFullYear() > 2025
        ? format(dueDate, "MMM d, yyyy")
        : format(dueDate, "MMM d");
    taskDueDate.textContent = formattedDate;
    textContainer.appendChild(taskDueDate);

    const taskDescription = document.createElement("p");
    taskDescription.classList.add("task-description");
    taskDescription.textContent = task.getDescription();
    textContainer.appendChild(taskDescription);

    taskTab.appendChild(textContainer);
    taskContainer.appendChild(taskTab);

    checkbox.addEventListener("click", function () {
      controller.removeTask(projectTitle, index);
      taskTab.remove();
      completeSound.play();
    });

    const handleEditSubmit = function (
      e,
      editTaskForm,
      task,
      projectTitle,
      index,
      taskTab,
      controller,
      editTaskDialog
    ) {
      e.preventDefault();
      const newProjectTitle = editTaskForm["edit-project"].value;

      // Update the task details
      const updatedTitle = editTaskForm["edit-title"].value;
      const updatedDescription = editTaskForm["edit-description"].value;
      const updatedDueDate = editTaskForm["edit-due-date"].value;
      const updatedPriority = editTaskForm["edit-priority"].value;

      // Remove the task from the current project
      controller.removeTask(projectTitle, index);
      taskTab.remove();

      // Add a new task with the updated details
      controller.addTask(
        updatedTitle,
        updatedDescription,
        updatedDueDate,
        updatedPriority,
        newProjectTitle
      );

      editTaskDialog.close();
      displayTasks(controller.getProject(projectTitle), controller);
      displayTasks(controller.getProject(newProjectTitle), controller);
    };

    editIcon.addEventListener("click", function () {
      const editTaskDialog = document.querySelector(".edit-task-dialog");
      const editTaskForm = document.querySelector(".edit-task-form");
      const editProjectSelect = editTaskForm["edit-project"];

      // Clear existing options
      editProjectSelect.innerHTML = "";

      // Populate the project dropdown with the current list of projects
      const projects = controller.getProjects();
      projects.forEach((project) => {
        const option = document.createElement("option");
        option.value = project.getTitle();
        option.textContent = project.getTitle();
        editProjectSelect.appendChild(option);
      });

      // Populate the edit form with the current task details
      editTaskForm["edit-title"].value = task.getTitle();
      editTaskForm["edit-description"].value = task.getDescription();
      editTaskForm["edit-due-date"].value = task.getDueDate();
      editTaskForm["edit-priority"].value = task.getPriority();
      editTaskForm["edit-project"].value = task.getProject() || "Inbox";

      editTaskDialog.showModal();

      // Remove the existing event listener before adding a new one
      const newHandleEditSubmit = function (e) {
        handleEditSubmit(
          e,
          editTaskForm,
          task,
          projectTitle,
          index,
          taskTab,
          controller,
          editTaskDialog
        );
        editTaskForm.removeEventListener("submit", newHandleEditSubmit);
      };

      editTaskForm.addEventListener("submit", newHandleEditSubmit);

      const editCancelButton = document.getElementById(
        "edit-task-cancel-button"
      );
      editCancelButton.addEventListener("click", function () {
        editTaskDialog.close();
      });
    });
  });
};

const displayAllTasks = (controller) => {
  const completeSound = new Audio(completedSound);
  const tasks = controller.getAllTasks();
  const contentContainer = document.querySelector(".content");

  contentContainer.replaceChildren();

  const projectHeading = document.createElement("h1");
  projectHeading.textContent = "Inbox";
  contentContainer.append(projectHeading);

  // Create and append taskContainer
  const taskContainer = document.createElement("div");
  taskContainer.classList.add("task-container");
  contentContainer.append(taskContainer);

  tasks.forEach((task, index) => {
    const taskTab = document.createElement("div");
    taskTab.classList.add("task-tab");
    taskTab.setAttribute("data-index", index);

    const taskControls = document.createElement("div");
    taskControls.classList.add("task-controls");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add(`${task.getPriority()}`);
    checkbox.classList.add("checkbox");
    taskControls.appendChild(checkbox);

    const editIcon = document.createElement("i");
    editIcon.classList.add("fas", "fa-edit", "edit-icon");
    taskControls.appendChild(editIcon);

    taskTab.appendChild(taskControls);
    const textContainer = document.createElement("div");
    textContainer.classList.add("text-container");

    const taskTitle = document.createElement("p");
    taskTitle.classList.add("task-title");
    taskTitle.textContent = task.getTitle();
    textContainer.appendChild(taskTitle);

    const taskDueDate = document.createElement("p");
    taskDueDate.classList.add("task-due-date");
    const dueDate = parseISO(task.getDueDate());
    const formattedDate =
      dueDate.getFullYear() > 2025
        ? format(dueDate, "MMM d, yyyy")
        : format(dueDate, "MMM d");
    taskDueDate.textContent = formattedDate;
    textContainer.appendChild(taskDueDate);

    const taskDescription = document.createElement("p");
    taskDescription.classList.add("task-description");
    taskDescription.textContent = task.getDescription();
    textContainer.appendChild(taskDescription);

    taskTab.appendChild(textContainer);
    taskContainer.appendChild(taskTab);

    checkbox.addEventListener("click", function () {
      controller.removeTask(task.getProject(), index);
      taskTab.remove();
      completeSound.play();
    });

    editIcon.addEventListener("click", function () {
      const editTaskDialog = document.querySelector(".edit-task-dialog");
      const editTaskForm = document.querySelector(".edit-task-form");
      const editProjectSelect = editTaskForm["edit-project"];

      // Clear existing options
      editProjectSelect.innerHTML = "";

      // Populate the project dropdown with the current list of projects
      const projects = controller.getProjects();
      projects.forEach((project) => {
        const option = document.createElement("option");
        option.value = project.getTitle();
        option.textContent = project.getTitle();
        editProjectSelect.appendChild(option);
      });

      // Populate the edit form with the current task details
      editTaskForm["edit-title"].value = task.getTitle();
      editTaskForm["edit-description"].value = task.getDescription();
      editTaskForm["edit-due-date"].value = task.getDueDate();
      editTaskForm["edit-priority"].value = task.getPriority();
      editTaskForm["edit-project"].value = task.getProject() || "Inbox";

      editTaskDialog.showModal();

      // Remove the existing event listener before adding a new one
      const newHandleEditSubmit = function (e) {
        handleEditSubmit(
          e,
          editTaskForm,
          task,
          task.getProject(),
          index,
          taskTab,
          controller,
          editTaskDialog
        );
        editTaskForm.removeEventListener("submit", newHandleEditSubmit);
      };

      editTaskForm.addEventListener("submit", newHandleEditSubmit);

      const editCancelButton = document.getElementById(
        "edit-task-cancel-button"
      );
      editCancelButton.addEventListener("click", function () {
        editTaskDialog.close();
      });
    });
  });
};

// Purely for adding colouring for tabs
function setupTabClickHandlers(controller) {
  document.addEventListener("DOMContentLoaded", () => {
    const topSidebarUpper = document.querySelector(".top-sidebar-upper");
    const projectList = document.querySelector(".project-list");

    function handleTabClick(event) {
      if (event.target.classList.contains("tab")) {
        // Remove active class from all tabs in both containers
        const allTabs = document.querySelectorAll(
          ".top-sidebar-upper .tab, .project-list .tab"
        );
        allTabs.forEach((tab) => tab.classList.remove("active"));

        // Add active class to the clicked tab
        event.target.classList.add("active");

        // Check if the clicked tab is the "Inbox" tab
        if (event.target.id === "inbox-tab") {
          displayAllTasks(controller);
        }
      }
    }

    topSidebarUpper.addEventListener("click", handleTabClick);
    projectList.addEventListener("click", handleTabClick);
  });
}

export {
  displayProjects,
  displayTasks,
  setupTabClickHandlers,
  displayAllTasks,
};
