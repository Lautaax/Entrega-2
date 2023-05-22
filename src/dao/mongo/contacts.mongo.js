import mongoose from "mongoose";
import { contactModel } from "./model/contact.js";
import  config  from "../../config.js";

export default class Contact{
    constructor(){
        mongoose.connect(config.dbUrl)
    }

    get =() =>{
        const contacts =contactModel.find()
        return contacts
    }

}