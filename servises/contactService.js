const { Contact } = require("../db/postModel");

const getContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

const getContactsById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  return contact;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const newContact = new Contact({ name, email, phone });
  await newContact.save();
  return newContact;
};

const deleteContactById = async ({ contactId }) => {
  await Contact.findByIdAndRemove(contactId);
};

const updateContactById = async ({ contactId }, body) => {
  const { name, email, phone } = body;
  const contact = {
    name,
    email,
    phone,
  };
  await Contact.findByIdAndUpdate(contactId, { $set: contact });
  return contact;
};

module.exports = {
  getContacts,
  getContactsById,
  addContact,
  deleteContactById,
  updateContactById,
};
