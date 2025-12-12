import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
});
