const { Contact } = require("../db/contactModel");
const { WrongParametersError } = require("../helpers/errors");

const getContacts = async (owner, { favorite, page, limit }) => {
  const countPage = page * limit - limit;
  if (!favorite) {
    return Contact.find({ owner })
      .skip(countPage)
      .limit(limit)
      .select({ __v: 0 });
  }
  return Contact.find({ owner, favorite }).select({ __v: 0 });
};

const updateContact = async (contactId, data, owner) => {
  return Contact.findOneAndUpdate({ _id: contactId, owner }, { $set: data });
};

const getContactsById = async (contactId, owner) => {
  const contact = await Contact.findOne({ _id: contactId, owner }).select({
    __v: 0,
  });
  if (!contact) {
    throw new WrongParametersError(`Contact with id ${contactId} not found`);
  }
  return contact;
};

const addContact = async (name, email, phone, favorite, owner) => {
  const newContact = new Contact({ name, email, phone, favorite, owner });
  return newContact.save();
};

const updateContactById = async (
  contactId,
  name,
  email,
  phone,
  favorite,
  owner
) => {
  const contact = {
    name,
    email,
    phone,
    favorite,
  };
  const editContact = await updateContact(contactId, contact, owner);
  if (!editContact) {
    throw new WrongParametersError(`Contact with id ${contactId} not found`);
  }
  return await getContactsById(contactId, owner);
};

const updateStatusContact = async (contactId, { favorite }, owner) => {
  const editContact = await updateContact(contactId, { favorite }, owner);
  if (!editContact) {
    throw new WrongParametersError(`Contact with id ${contactId} not found`);
  }
  return await getContactsById(contactId, owner);
};

const deleteContactById = async (contactId, owner) => {
  const contact = await Contact.findOneAndRemove({ _id: contactId, owner });

  if (!contact) {
    throw new WrongParametersError(`Contact with id ${contactId} not found`);
  }
};

module.exports = {
  getContacts,
  getContactsById,
  addContact,
  updateContactById,
  updateStatusContact,
  deleteContactById,
};
