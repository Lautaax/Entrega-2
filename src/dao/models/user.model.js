import mongoose from "mongoose";

const userCollection = "Users";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  age: Number,
  password: String,
  role:String,
  resetToken:String,
  tokenExpiration:Date,
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carts",
  },

});

const userModel = mongoose.model(userCollection, userSchema);

export  {userModel};