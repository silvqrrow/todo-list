import "./styles.css";
import { toDoController } from "./toDoController";
import {
  initializeProjectButtonLogic,
  initializeTaskButtonLogic,
} from "./creationButtonLogic";
import { setupTabClickHandlers } from "./domManipulation.js";

const controller = toDoController();
controller.addProject("Inbox");
initializeProjectButtonLogic(controller);
initializeTaskButtonLogic(controller);
setupTabClickHandlers(controller);

displayAllTasks(controller);
