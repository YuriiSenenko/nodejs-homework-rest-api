const { Contact } = require("./db/postModel");

const get = async () => {
  return await Contact.find();
};

const getById = async (contactId) => {
  return await Contact.findById(contactId);
};

const add = async (name, email, phone, favorite) => {
  const newContact = new Contact({ name, email, phone, favorite });
  return await newContact.save();
};

const remove = async (contactId) => {
  return await Contact.findByIdAndRemove(contactId);
};

const update = async (contactId, data) => {
  return await Contact.findByIdAndUpdate(contactId, {
    $set: data,
  });
};

module.exports = { get, getById, add, remove, update };
