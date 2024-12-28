class Task {
    constructor(title, description, dueDate, priority, project) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
        this.completed = false;
    }

    // Getters
    getTitle() {
        return this.title;
    }

    getDescription() {
        return this.description;
    }

    getDueDate() {
        return this.dueDate;
    }

    getPriority() {
        return this.priority;
    }

    getCompleted() {
        return this.completed;
    }

    getProject() {
        return this.project;
    }

    // Setters
    setTitle(value) {
        this.title = value;
    }

    setDescription(value) {
        this.description = value;
    }

    setDueDate(value) {
        this.dueDate = value;
    }

    setPriority(value) {
        this.priority = value;
    }

    setProject(value) {
        this.project = value;
    }

    completeTask() {
        this.completed = true;
    }
}

export { Task };