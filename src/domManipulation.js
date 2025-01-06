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

export { displayProjects };
