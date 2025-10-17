import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./src/routes/todoRoutes.js";
import { initBackend } from "./src/config/init.js";

dotenv.config();

await initBackend(); // connexion à Mongo ou Postgres selon DRIVER

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/todos", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API prête sur http://localhost:${PORT}`));
