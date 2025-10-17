import express from "express";
import controller from "../controllers/todoController.js";

const router = express.Router();

router.get("/", controller.list);
router.post("/", controller.add);
router.delete("/:id", controller.delete);

export default router;
