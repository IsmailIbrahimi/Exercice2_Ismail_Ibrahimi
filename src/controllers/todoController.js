import store from "../models/todoModel.js";

const list = async (_req, res) => {
    const todos = await store.getAll();
    res.json(todos);
};

const add = async (req, res) => {
    const title = (req.body?.title ?? req.query?.title ?? "").trim();
    if (!title) return res.status(400).json({ error: "title requis (string)" });
    const created = await store.addTask(title);
    res.status(201).json(created);
};

const remove = async (req, res) => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "id invalide" });
    const deleted = await store.deleteTask(id);
    if (!deleted) return res.status(404).json({ error: "tâche introuvable" });
    res.json(deleted);
};

export default { list, add, delete: remove };
