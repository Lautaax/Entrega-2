import express from "express";
import handlebars from 'express-handlebars'
import __dirname from "./utils.js";
import socket from './socket.js'
import mongoose from "mongoose";
import dotenv from "dotenv";
import productsRouter from './routes/products.router.js';
import cartrouter from './routes/cart.router.js'
import viewrouter from './routes/views.router.js'
import chatRouter from "./routes/chat.router.js"
dotenv.config();

const app = express();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const dbName=process.env.DB_NAME
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: true }));


app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");
app.use(express.static(`${__dirname}/public`));


const httpServer = app.listen(8080, () => {
    try {
        console.log("Servidor arriba en el puerto 8080");
        console.log(dbUser)
    } catch (error) {
        console.log(error);
    }
});
const enviroment = async () =>{
await mongoose.connect(
    `mongodb+srv://${dbUser}:${dbPassword}@${dbName}.ewxur7f.mongodb.net/?retryWrites=true&w=majority`
)}

app.use("/chat",chatRouter);
app.use("/", viewrouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartrouter);
socket.connect(httpServer)
enviroment()




