import { todoStore } from "../models/todoModel.js";

const list = async (_req, res) => {
    const data = await todoStore.getAll();
    res.json(data);
};

const add = async (req, res) => {
    const title = (req.body?.title ?? req.query?.title ?? "").trim();
    if (!title) return res.status(400).json({ error: "title requis (string)" });
    const created = await todoStore.addTask(title);
    res.status(201).json(created);
};

const remove = async (req, res) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "id invalide" });
    const deleted = await todoStore.deleteTask(id);
    if (!deleted) return res.status(404).json({ error: "tâche introuvable" });
    res.json(deleted);
};

export default { list, add, delete: remove };