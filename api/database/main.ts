import express, { Request, Response } from "express";
import dotenv from "dotenv";
import Models from "./models/index";

dotenv.config();

const PORT = process.env.DATABASE_CONTAINER_PORT ?? 3003;

const app = express();

app.use(express.json())



app.listen(PORT, () => {
  console.log(`Database microservice up on port ${PORT}`);
});
