import { Pool } from "pg";
import membersRouter from "./routers/members.router.js";
import categoriesRouter from "./routers/categories.router.js";
import express from "express";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
});

const testDbConnection = async () => {
  try {
    const client = await pool.connect();
    console.log("Database connected...");
    client.release();
  } catch (err) {
    console.error("Error acquiring client", err);
    process.exit(1);
  }
};

testDbConnection();

app.use("/members", membersRouter);
app.use("/categories", categoriesRouter);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
