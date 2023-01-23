const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const listPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(listPath, "utf8");
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const [searchContact] = await contacts.filter(
    (contact) => contact.id === contactId
  );
  return searchContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return;
  }
  contacts.splice(index, 1);
  await fs.writeFile(listPath, JSON.stringify(contacts));
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const newContact = { id: uuidv4(), name, email, phone };
  const contacts = await listContacts();
  contacts.push(newContact);
  await fs.writeFile(listPath, JSON.stringify(contacts));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const newCont = { id: contactId, name, email, phone };
  const contacts = await listContacts();
  const index = await contacts.findIndex((item) => item.id === contactId);
  contacts.splice(index, 1, newCont);
  await fs.writeFile(listPath, JSON.stringify(contacts));
  return newCont;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
