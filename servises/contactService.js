const { Contact } = require("../db/postModel");
const { WrongParametersError } = require("../helpers/errors");

const getContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

const getContactsById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw new WrongParametersError(`Contact with id ${contactId} not found`);
  }
  return contact;
};

const addContact = async (body) => {
  const { name, email, phone, favorite } = body;
  const newContact = new Contact({ name, email, phone, favorite });
  await newContact.save();
  return newContact;
};

const deleteContactById = async ({ contactId }) => {
  const contact = await Contact.findByIdAndRemove(contactId);
  if (!contact) {
    throw new WrongParametersError(`Contact with id ${contactId} not found`);
  }
};

const updateContactById = async ({ contactId }, body) => {
  const { name, email, phone, favorite } = body;
  const contact = {
    name,
    email,
    phone,
    favorite,
  };
  const updateContact = await Contact.findByIdAndUpdate(contactId, {
    $set: contact,
  });
  const fullUpdateContact = await Contact.findById(contactId);
  if (!updateContact) {
    throw new WrongParametersError(`Contact with id ${contactId} not found`);
  }
  return fullUpdateContact;
};

const updateStatusContact = async ({ contactId }, { favorite }) => {
  const updateContact = await Contact.findByIdAndUpdate(contactId, {
    $set: { favorite },
  });
  if (!updateContact) {
    throw new WrongParametersError(`Contact with id ${contactId} not found`);
  }
  return await Contact.findById(contactId);
};

module.exports = {
  getContacts,
  getContactsById,
  addContact,
  updateContactById,
  updateStatusContact,
  deleteContactById,
};
