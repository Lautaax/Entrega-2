import winston from "winston";
import config from "../src/config.js"
const winstonLogger  ={
  development :[
    new winston.transports.Console({level : Debug}),
    new winston.transports.File ({filename:"/logs.log", level :"info" })
  ],
  production:[
    new winston.transports.Console({level : http}),
    new winston.transports.File ({filename:"/errors.log", level :"warn" })
  ]
}

const addLogger =(req, res, next) =>{
  req.logger = winston.createLogger({
    transports:  winstonLogger[config.app.ENV]});
req.logger.http(
  `req${req.method}  at ${req.url} - ${new.date().toLocaleTimeString()} `
)

}

