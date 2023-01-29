const { WrongParametersError } = require("../helpers/errors");
const {
  getContact,
  findContactById,
  createContact,
  removeContact,
  updateContact,
} = require("../db/config");

const getContacts = async () => {
  return getContact();
};

const getContactsById = async (contactId) => {
  const contact = await findContactById(contactId);
  if (!contact) {
    throw new WrongParametersError(`Contact with id ${contactId} not found`);
  }
  return contact;
};

const addContact = async (body) => {
  const { name, email, phone, favorite } = body;
  return createContact(name, email, phone, favorite);
};

const deleteContactById = async ({ contactId }) => {
  const contact = await removeContact(contactId);
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
  const editContact = await updateContact(contactId, contact);
  if (!editContact) {
    throw new WrongParametersError(`Contact with id ${contactId} not found`);
  }
  return await findContactById(contactId);
};

const updateStatusContact = async ({ contactId }, { favorite }) => {
  const editContact = await updateContact(contactId, { favorite });
  if (!editContact) {
    throw new WrongParametersError(`Contact with id ${contactId} not found`);
  }
  return await findContactById(contactId);
};

module.exports = {
  getContacts,
  getContactsById,
  addContact,
  updateContactById,
  updateStatusContact,
  deleteContactById,
};
