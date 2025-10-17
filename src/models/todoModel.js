import { PostgresTodoStore } from "./adapters/postgresTodoStore.js";
import { MongoTodoStore } from "./adapters/mongoTodoStore.js";

const drv = (process.env.DRIVER || "postgres").toLowerCase();
const store = drv === "mongo" ? new MongoTodoStore() : new PostgresTodoStore();

export default store;
