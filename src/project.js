class Project {
    tasks = [];

    constructor(title) {
        this._title = title;
    }

    // Getters
    getTitle() {
        return this._title;
    }

    getTasks() {
        return this.tasks;
    }

    // Setters
    setTitle(value) {
        this._title = value;
    }

    setTasks(value) {
        this.tasks = value;
    }

    // Method to add a task
    addTask(task) {
        this.tasks.push(task);
    }
}