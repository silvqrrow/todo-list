import { Project } from "./project";
import { Task } from "./task";

const toDoController = function () {
  const projects = [];

  const createProject = (title) => new Project(title);
  const createTask = (title, description, dueDate, priority, project) =>
    new Task(title, description, dueDate, priority, project);

  const addProject = (projectTitle) => {
    const newProject = createProject(projectTitle);
    projects.push(newProject);
  };

  const searchForProject = (projectTitle) => {
    return projects.find((project) => project.title == projectTitle);
  };

  const getProjects = () => {
    return projects;
  };

  const removeProject = (index) => {
    projects.splice(index, 1);
  };

  const getTasks = (projectTitle) => {
    const projectToGetTasks = searchForProject(projectTitle);
    if (!projectToGetTasks) {
      return [];
    }
    return projectToGetTasks.getTasks();
  };

  const removeTask = (projectTitle, taskIndex) => {
    const project = searchForProject(projectTitle);
    if (project) {
      project.getTasks().splice(taskIndex, 1);
    }
  };

  const addTask = (title, description, dueDate, priority, project) => {
    const projectToAdd = searchForProject(project);
    const newTask = createTask(title, description, dueDate, priority, project);
    projectToAdd.addTask(newTask);
  };

  const getProject = (projectTitle) => {
    return projects.find((project) => project.getTitle() === projectTitle);
  };

  return {
    addProject,
    getProjects,
    addTask,
    getTasks,
    createProject,
    createTask,
    removeProject,
    searchForProject,
    removeTask,
    getProject,
  };
};

export { toDoController };
