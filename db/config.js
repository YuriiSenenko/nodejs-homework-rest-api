const { Contact } = require("./postModel");

const getContact = () => {
  return Contact.find();
};

const findContactById = (contactId) => {
  return Contact.findById(contactId);
};

const createContact = (name, email, phone, favorite) => {
  const newContact = new Contact({ name, email, phone, favorite });
  return newContact.save();
};

const removeContact = (contactId) => {
  return Contact.findByIdAndRemove(contactId);
};

const updateContact = (contactId, data) => {
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
