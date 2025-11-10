import dotenv from "dotenv";
import pkg from "pg";
dotenv.config();
const { Pool } = pkg;

export const pool = new Pool(
    process.env.DATABASE_URL
        ? {
            connectionString: process.env.DATABASE_URL,
            ssl: process.env.PGSSLMODE === "require" ? { rejectUnauthorized: false } : false,
        }
        : {
            host: process.env.PGHOST,
            port: process.env.PGPORT,
            user: process.env.PGUSER,
            password: process.env.PGPASSWORD,
            database: process.env.PGDATABASE,
        }
);

export async function ensurePg() {
    await pool.query("SELECT 1");
    await pool.query(`
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      done BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `);
    console.log("✅ PostgreSQL OK (via " + (process.env.DATABASE_URL ? "DATABASE_URL" : "vars séparées") + ")");
}
