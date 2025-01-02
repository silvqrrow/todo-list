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

const initializeTaskButtonLogic = (controller) => {
    const addTaskButton = document.getElementById("add-task");
    const datePickerId = document.getElementById("dueDate");
    datePickerId.min = new Date().toLocaleDateString('fr-ca')
    // do below
    const taskDialog = document.querySelector(".task-dialog");
    const addTaskForm = document.querySelector(".add-task-form");
    const cancelButton = document.getElementById("cancel-button");  

    addTaskButton.addEventListener("click", function () {
        taskDialog.showModal();
    });

    cancelButton.addEventListener("click", function () {
        taskDialog.close();
        addTaskForm.reset();
    });
};

export { initializeProjectButtonLogic, initializeTaskButtonLogic };