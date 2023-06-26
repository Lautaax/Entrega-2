import dotenv from "dotenv"
dotenv.config();

import { environment } from "./commander.js";


dotenv.config({
    path: environment === "DEVELOPMENT" ? "./.env.dev" : "./.env.prod",
  }); 
  
const secret=process.env.SESSION_SECRET
const connectiondatabase=process.env.DB_URL
const config ={
    dbUrl: connectiondatabase,
    sessionSecret: secret,
    clientID:process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    callbackUrl:process.env.CALLBACK_URL,
    mode:process.env.DEVELOPMENT_MODE,
    
    loggermode:process.env.LOGGER
}
export default config