import { ensurePg } from "./pg.js";
import { ensureMongo } from "./mongo.js";

export async function initBackend() {
  const drv = (process.env.DRIVER || "postgres").toLowerCase();
  if (drv === "postgres") {
    console.log("Utilisation de PostgreSQL");
    return ensurePg();
  } else if (drv === "mongo") {
    console.log("Utilisation de MongoDB (Mongoose)");
    return ensureMongo();
  } else {
    throw new Error(`DRIVER invalide: ${drv}`);
  }
}
