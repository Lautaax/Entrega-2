import express from "express";
import handlebars from 'express-handlebars'
import __dirname from "./utils/utils.js";
import socket from './socket.js'
import morgan from "morgan"
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import { faker } from "@faker-js/faker/locale/es";
import productsRouter from './routes/products.router.js';
import cartrouter from './routes/cart.router.js'
import viewrouter from './routes/views.router.js'
import database from "./db.js";
import config from "./config.js";
import sessionsRouter from "./routes/sessions.router.js"
import passport from "passport";
import initializePassport from "./auth/passport.js";
import mockRouter from "./routes/mocking.router.js";
import smsRouter from "./routes/sms.router.js"
import mailRouter from './routes/mail.router.js'
import { winstonLogger,logger } from "./utils/logger.js";
import loggerRouter from "./routes/loggertest.router.js"

// import passport from "passport";
// import initializePassport from "../middlewares/passport.js";

//Initialization
const app = express();

//Middlewares
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(morgan("dev"))


app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.dbUrl,
      ttl:20
    }),
    resave: true,
    saveUninitialized: false,
    secret: config.sessionSecret,
  })
);

initializePassport()
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser());

//View engine
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");



const httpServer = app.listen(8080, () => {
    try {
        console.log("Servidor arriba en el puerto 8080");

    } catch (error) {
        console.log(error);
    }
});

database.connect();
//app.use("/chat" ,chatRouter);
app.get("/loggerTest", loggerRouter);
app.get("/mockingproducts",mockRouter)
app.use("/api/sessions", sessionsRouter);
app.use("/", viewrouter);
app.use("/api/products", productsRouter);
app.get("/mail",mailRouter)
app.get("/sms",smsRouter)
app.use("/api/carts", cartrouter);
socket.connect(httpServer)




