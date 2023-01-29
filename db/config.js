const { Contact } = require("./postModel");

const getContact = async () => {
  return Contact.find();
};

const findContactById = async (contactId) => {
  return Contact.findById(contactId);
};

const createContact = async (name, email, phone, favorite) => {
  const newContact = new Contact({ name, email, phone, favorite });
  return newContact.save();
};

const removeContact = async (contactId) => {
  return Contact.findByIdAndRemove(contactId);
};

const updateContact = async (contactId, data) => {
  return Contact.findByIdAndUpdate(contactId, {
    $set: data,
  });
};

module.exports = {
  getContact,
  findContactById,
  createContact,
  removeContact,
  updateContact,
};
