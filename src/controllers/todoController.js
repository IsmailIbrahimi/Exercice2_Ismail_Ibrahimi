import { todoStore } from "../models/todoModel.js";

const list = (req, res) => {
    res.json(todoStore.getAll());
};

const add = (req, res) => {
    const { title } = req.body || {};
    if (!title || typeof title !== "string") {
        return res.status(400).json({ error: "title requis (string)" });
    }
    const created = todoStore.addTask(title.trim());
    res.status(201).json(created);
};

const remove = (req, res) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "id invalide" });
    const deleted = todoStore.deleteTask(id);
    if (!deleted) return res.status(404).json({ error: "tâche introuvable" });
    res.json(deleted);
};

export default { list, add, delete: remove };
