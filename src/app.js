import express from "express";
import handlebars from 'express-handlebars'
import __dirname from "./dirname.js";
import socket from './socket.js'
import morgan from "morgan"
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import { faker } from "@faker-js/faker/locale/es";
import database from "./db.js";
import config from "./config.js";
import passport from "passport";
import cookieParser from "cookie-parser"
import initializePassport from "./auth/passport.js";
import { winstonLogger } from "./utils/logger.js";

import routesFunction from "./routes/app.router.js";
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
app.use(cookieParser())
app.use(winstonLogger)
app.use(express.json());


app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.dbUrl,
      ttl: 6000
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
routesFunction(app)
//View engine
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");



const httpServer = app.listen(8080, () => {
    try {
        console.log("Servidor arriba en el puerto 8080");

    } catch (error) {
        console.log(error);
        return res.status(500).send({
          status: "error",
          error: "Failed to the connect to the server",
        });
    }
});

database.connect();
socket.connect(httpServer)




