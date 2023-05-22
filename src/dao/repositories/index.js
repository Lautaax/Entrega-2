import { contactDao } from "../factory.js";
import ContactRepository from "./contacts.repositories.js";

export const contactService = new ContactRepository(contactDao);