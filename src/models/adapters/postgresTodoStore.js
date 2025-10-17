import { pool } from "../../config/pg.js";

export class PostgresTodoStore {
    async getAll() {
        const { rows } = await pool.query("SELECT id, title, done FROM todos ORDER BY id");
        return rows;
    }

    async addTask(title) {
        const { rows } = await pool.query(
            "INSERT INTO todos(title) VALUES($1) RETURNING id, title, done",
            [title]
        );
        return rows[0];
    }

    async deleteTask(id) {
        const { rows } = await pool.query(
            "DELETE FROM todos WHERE id=$1 RETURNING id, title, done",
            [id]
        );
        return rows[0] || null;
    }
}
