import express from "express";
import handlebars from 'express-handlebars'
import __dirname from "./dirname.js";

import cookieParser from "cookie-parser";
import morgan from "morgan"
import session from "express-session";
import MongoStore from "connect-mongo";
import database from "./db.js";
import config from "./config.js";
import passport from "passport";
import initializePassport from "./auth/passport.js";
import { winstonLogger } from "./utils/logger.js";
import bodyParser from "body-parser";

import routesFunction from "./routes/app.router.js";
// import passport from "passport";
// import initializePassport from "../middlewares/passport.js";

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUIExpress from "swagger-ui-express"

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Adopt Me API",
      description: "Documentacíon que soporta al sistema Adopt Me",
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};

const specs = swaggerJSDoc(swaggerOptions);

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



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

routesFunction(app)
app.use(passport.initialize())
app.use(passport.session())
//app.use(addLogger)
//app.use("/api-docs" , swaggerUIExpress.serve, swaggerUIExpress(specs))

//socket.connect(httpServer)




