
import contact from "../mongo/contacts.mongo.js"

export default class ContactRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getContacts = async () => {
    const contacts = await this.dao.get();
    return contacts;
  };

  create = async (contact) => {
    const contactToInsert = new contact(contact);
    const createdContact = await this.dao.create(contactToInsert);
    return createdContact;
  };
}