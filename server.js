import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { User } from "./src/models/userModel.js";

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./src/routes/todoRoutes.js";
import { initBackend } from "./src/config/init.js";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
const swaggerDocument = JSON.parse(fs.readFileSync("./swagger.json", "utf-8"));

dotenv.config();

await initBackend(); // connexion à Mongo ou Postgres selon DRIVER dans .env

if (mongoose.connection.readyState === 0) {
  const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/testDB";
  await mongoose.connect(mongoUrl);
  console.log("MongoDB connecté pour les users (JWT)");
}

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/todos", routes);

// POST /login
app.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new Error("Wrong details please check at once");
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
      },
      "secretkeyappearshere",
      { expiresIn: "1h" }
    );
  } catch (err) {
    console.log(err);
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }

  return res.status(200).json({
    success: true,
    data: {
      userId: existingUser.id,
      email: existingUser.email,
      token: token,
    },
  });
});

// POST /signup
app.post("/signup", async (req, res, next) => {
  const { name, email, password } = req.body;

  const newUser = new User({ name, email, password });

  try {
    await newUser.save();
  } catch (err) {
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: newUser.id,
        email: newUser.email,
      },
      "secretkeyappearshere",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }

  return res.status(201).json({
    success: true,
    data: {
      userId: newUser.id,
      email: newUser.email,
      token: token,
    },
  });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API prête sur http://localhost:${PORT}`);
  console.log(`Documentation Swagger: http://localhost:${PORT}/api-docs`);
});