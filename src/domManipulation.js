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
  const projectTitle = project.getTitle();
  const tasks = controller.getTasks(projectTitle);
  const taskContainer = document.querySelector(".content");
  taskContainer.replaceChildren();

  const projectHeading = document.createElement("h1");
  projectHeading.textContent = projectTitle;

  taskContainer.append(projectHeading);
  tasks.forEach((task, index) => {
    const taskTab = document.createElement("div");
    // projectTab.classList.add("btn-projects");
    // projectTab.classList.add("tab");
    taskTab.setAttribute("data-index", index);

    // Set text for tab
    taskTab.textContent = task.getTitle();
    taskContainer.appendChild(taskTab);
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
