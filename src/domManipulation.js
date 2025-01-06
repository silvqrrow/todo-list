// filepath: /home/jasmine/Odin/Projects/todo-list/src/domManipulation.js
import { format } from "date-fns";
import completedSound from "./sounds/completed.mp3";

const displayProjects = (controller) => {
  const projectContainer = document.querySelector(".project-list");
  projectContainer.replaceChildren();
  controller.getProjects().forEach((project, index) => {
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

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add(`${task.getPriority()}`);
    checkbox.classList.add("checkbox");
    taskTab.appendChild(checkbox);

    const textContainer = document.createElement("div");
    textContainer.classList.add("text-container");

    const taskTitle = document.createElement("p");
    taskTitle.classList.add("task-title");
    taskTitle.textContent = task.getTitle();
    textContainer.appendChild(taskTitle);

    const taskDueDate = document.createElement("p");
    taskDueDate.classList.add("task-due-date");
    const dueDate = new Date(task.getDueDate());
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
      completeSound.play(); // Play the complete sound
    });
  });
};
// Purely for adding colouring for tabs
function setupTabClickHandlers() {
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
      }
    }

    topSidebarUpper.addEventListener("click", handleTabClick);
    projectList.addEventListener("click", handleTabClick);
  });
}

export { displayProjects, displayTasks, setupTabClickHandlers };
