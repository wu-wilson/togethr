import membersRouter from "./routers/members.router.js";
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

app.use("/members", membersRouter);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
});
