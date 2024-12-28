class Project {
    tasks = [];

    constructor(title) {
        this.title = title;
    }

    // Getters
    getTitle() {
        return this.title;
    }

    getTasks() {
        return this.tasks;
    }

    // Setters
    setTitle(value) {
        this.title = value;
    }

    // Method to add a task
    addTask(task) {
        this.tasks.push(task);
    }
}

export { Project };