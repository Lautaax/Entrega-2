import { contactModel } from "./model/contact.js";

class Contact {
  constructor() {}

  getContact = async () => {
    const contacts = await contactModel.find();
    return contacts;
  };

  create = async (contact) => {
    const createdContact = await contactModel.create(contact);
    return createdContact;
  };
}

export  const contactMongo = new Contact();
