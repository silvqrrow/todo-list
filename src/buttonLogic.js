const initializeProjectButtonLogic = (controller) => {
    const addProjectButton = document.getElementById("add-project");
    const projectDialog = document.querySelector(".project-dialog");
    const addProjectForm = document.querySelector(".add-project-form");
    const cancelButton = document.getElementById("cancel-button");  

    addProjectButton.addEventListener("click", function () {
        projectDialog.showModal();
    });

    addProjectForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const title = addProjectForm.title.value;
        controller.addProject(title);
        projectDialog.close();
        addProjectForm.reset();
    });

    cancelButton.addEventListener("click", function () {
        projectDialog.close();
        addProjectForm.reset();
    });
};

export { initializeProjectButtonLogic };