import express, { Request, Response } from "express"
import dotenv from "dotenv"
dotenv.config()

const PORT = process.env.AUTH_CONTAINER_PORT ?? 3001

const app = express()

app.get("/", (req:Request,res:Response) => {res.send("HOLA MUNDO")})


app.listen(PORT, () => {
    console.log(`Auth microservice up on port ${PORT}`);
})