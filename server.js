// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./src/routes/todoRoutes.js";
import { ensureSchema, pool } from "./src/config/db.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/todos", todoRoutes);

const PORT = process.env.PORT || 3000;

(async () => {
    try {
        await pool.query("SELECT 1");
        await ensureSchema();
        app.listen(PORT, () =>
            console.log(`API OK 👉 http://localhost:${PORT}`)
        );
    } catch (e) {
        console.error("Erreur de démarrage:", e);
        process.exit(1);
    }
})();
