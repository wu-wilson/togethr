import express from "express";
import cors from "cors";
import { json as bodyParser } from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser());

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
});
