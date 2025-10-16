export default class TodoModel {
    constructor() {
        this.todos = [];
        this.id = 1;
    }

    getAll() {
        return this.todos;
    }

    addTask(title) {
        const newTask = { id: this.id++, title, done: false };
        this.todos.push(newTask);
        return newTask;
    }

    deleteTask(id) {
        const idx = this.todos.findIndex((t) => t.id === id);
        if (idx !== -1) {
            return this.todos.splice(idx, 1)[0];
        }
        return null;
    }
}

// Singleton en mémoire
export const todoStore = new TodoModel();
