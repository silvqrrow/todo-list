import "./styles.css";
import { toDoController } from "./toDoController";
import {
  initializeProjectButtonLogic,
  initializeTaskButtonLogic,
} from "./creationButtonLogic";
import { setupTabClickHandlers } from "./domManipulation.js";

const controller = toDoController();
initializeProjectButtonLogic(controller);
initializeTaskButtonLogic(controller);

setupTabClickHandlers();

window.controller = controller;

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
