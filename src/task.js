class Task {
    constructor(title, description, dueDate, priority = "Priority 4", completed = false, project = "Inbox") {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = completed;
        this.project = project;
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