const { WrongParametersError } = require("../helpers/errors");
const { get, getById, add, remove, update } = require("../db/config");

const getContacts = async () => {
  return get();
};

const getContactsById = async (contactId) => {
  const contact = await getById(contactId);
  if (!contact) {
    throw new WrongParametersError(`Contact with id ${contactId} not found`);
  }
  return contact;
};

const addContact = async (body) => {
  const { name, email, phone, favorite } = body;
  return add(name, email, phone, favorite);
};

const deleteContactById = async ({ contactId }) => {
  const contact = await remove(contactId);
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
  const updateContact = await update(contactId, contact);
  if (!updateContact) {
    throw new WrongParametersError(`Contact with id ${contactId} not found`);
  }
  return await getById(contactId);
};

const updateStatusContact = async ({ contactId }, { favorite }) => {
  const updateContact = await update(contactId, { favorite });
  if (!updateContact) {
    throw new WrongParametersError(`Contact with id ${contactId} not found`);
  }
  return await getById(contactId);
};

module.exports = {
  getContacts,
  getContactsById,
  addContact,
  updateContactById,
  updateStatusContact,
  deleteContactById,
};
