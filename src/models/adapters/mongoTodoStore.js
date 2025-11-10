import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    done: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now }
});

const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema);

export class MongoTodoStore {
    async getAll() {
        const docs = await Todo.find().sort({ _id: 1 }).lean();
        return docs.map(d => ({ id: d._id.toString(), title: d.title, done: d.done }));
    }

    async addTask(title) {
        const doc = await Todo.create({ title });
        return { id: doc._id.toString(), title: doc.title, done: doc.done };
    }

    async deleteTask(id) {
        const doc = await Todo.findByIdAndDelete(id).lean();
        if (!doc) return null;
        return { id: doc._id.toString(), title: doc.title, done: doc.done };
    }
}
