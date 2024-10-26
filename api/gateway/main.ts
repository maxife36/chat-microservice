import express from "express"
import dotenv from "dotenv"
import { createProxyMiddleware } from "http-proxy-middleware"

dotenv.config()

const PORT = process.env.GATEWAY_CONTAINER_PORT ?? 3000
const AUTH_PORT = process.env.AUTH_CONTAINER_PORT ?? 3001

const app = express()

app.use("/auth", createProxyMiddleware({
    target:`http://auth:${AUTH_PORT}`,
    changeOrigin: true
}))


app.listen(PORT, () =>{
    console.log(`Gateway microservice up on port ${PORT}`);
})