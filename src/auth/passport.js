import passport from "passport"
import local from "passport-local"
import userModel from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";
import GithubStrategy from "passport-github2"
import config from "../config.js";

import {cartModel}  from "../dao/models/cart.model.js";
import jwt from "passport-jwt"  

const { clientID, clientSecret, callbackUrl,JWT_SECRET } = config
const LocalStrategy = local.Strategy
const JWTStrategy=jwt.Strategy
const ExtractJwt=jwt.ExtractJwt


const cookieExtractor=(req)=>{
    let token=null;
    if(req && req.cookies){
        token=req.cookies["jwtCookie"]
    }
    return token
}
console.log(JWT_SECRET)
const jwtOptions={
    secretOrKey:JWT_SECRET,
    jwtFromRequest:ExtractJwt.fromExtractors([cookieExtractor])
}
const initializePassport = () => {
    passport.use(
        "register",
        new LocalStrategy(
            {
                passReqToCallback: true,
                usernameField: "email",
            },
            async (req, username, password, done) => {
                try {
                    const { first_name, last_name, email, role, age } = req.body;
                    let user = await userModel.findOne({ email: username });
                    if (user) {
                        console.log("User already exists");
                        return done(null, false);
                    }
                    const cart = await cartModel.create({});

                    const newUser = {
                        first_name,
                        last_name,
                        email,
                        age,
                        role: role ?? "user",
                        password: createHash(password),
                        cart: cart._id,
                    };

                    const result = await userModel.create(newUser);
                    return done(null, result);
                } catch (error) {
                    return done("Error on trying to find user" + error);
                }
            }
        )
    );
    passport.use("login", new LocalStrategy({ usernameField: "email" }, async (username, password, done) => {
        try {

            const user = await userModel.findOne({ email: username }).lean();
            console.log(user)
            if (!user) {
                console.error("Authentication")
                return done(null, false)
            }
            const validPassword = isValidPassword(user, password);
            console.log(validPassword)
            if (!validPassword) {
                console.error("Incorrect credentials")
                return done(null, false)
            }
        
            delete user.password



            return done(null, user);
        } catch (error) {
            return done(error)
        }
    }));

    passport.use("githublogin", 
    new GithubStrategy({
        clientID,
        clientSecret,
        callbackUrl,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile)
          let user = await userModel.findOne({ email: profile._json.email }).lean();

          if(user.email === "lautaa_97@outlook.com"){
            user.role = "admin"
        }
        if (user.email === "adminCoder@coder.com") {
            user.role = "admin"
        } else {
            user.role = "user"
        }
        delete user.password
          if (!user) {
            let newUser = {
              first_name: profile._json.name,
              last_name: "",
              age: 18,
              email: profile._json.email,
              password: "",
            };

            let result = await userModel.create(newUser);
            return done(null, result);
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
    passport.serializeUser((user, done) => {

        done(null, user._id)
    });
    passport.deserializeUser(async (id, done) => {
        let user = await userModel.findById(id)
        done(null, user)
    })
}
export default initializePassport;