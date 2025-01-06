import "./styles.css";
import { toDoController } from "./toDoController";
import {
  initializeProjectButtonLogic,
  initializeTaskButtonLogic,
} from "./creationButtonLogic";

const controller = toDoController();
initializeProjectButtonLogic(controller);
initializeTaskButtonLogic(controller);

// TO TEST
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", function () {
    document
      .querySelectorAll(".tab")
      .forEach((t) => t.classList.remove("tab-focused"));
    tab.classList.add("tab-focused");
  });
});

// Add a new project
controller.addProject("New Project");

// Get all projects
const projects = controller.getProjects();
console.log("Projects:", projects);

// Add a task to the new project
controller.addTask(
  "New Task",
  "Description",
  "2023-10-10",
  "High",
  "New Project"
);

// Get tasks from the new project
const tasks = controller.getTasks("New Project");
console.log("Tasks in New Project:", tasks);
