import mongoose from "mongoose";
import config from "../../src/config.js";

let contactDAO

switch (config.persistence) {
  case "MONGO":
    mongoose.connect(config.dbUrl);
    const  {contactMongo}  = await import("./mongo/contacts.mongo.js");
    console.log(contactMongo);
    contactDAO = contactMongo;
    break;

  case "MEMORY":
    const {contactMemory}  = await import("./memory/contacts.memory.js");
    contactDAO = contactMemory;
    break;
}

export { contactDAO };