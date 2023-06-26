import dotenv from "dotenv";
dotenv.config();

const user = process.env.DB_USER;
const password = process.env.DB_PASS;
const database=process.env.DB_NAME;



const config = {

  dbUrl: process.env.DB_URL,
   secret: process.env.JWT_SECRET,
   sessionSecret: process.env.SESSION_SECRET,
 clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackUrl: process.env.CALLBACK_URL,

  service: process.env.SERVICE,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,

  persistence: process.env.PERSISTENCE,
}

export default config;