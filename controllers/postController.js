const {
  getContacts,
  getContactsById,
  addContact,
  deleteContactById,
  updateContactById,
} = require("../servises/contactService");

const listContactsController = async (req, res, next) => {
  const contacts = await getContacts();
  res.json(contacts);
};

const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactsById(contactId);
  if (!contact) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.json({ contact });
};

const addContactController = async (req, res, next) => {
  const newContact = await addContact(req.body);
  res.status(201).json({ newContact });
};

const updateContactController = async (req, res, next) => {
  const updatedContact = await updateContactById(req.params, req.body);
  res.json({ updatedContact });
};

const removeContactController = async (req, res, next) => {
  const delelteContact = await deleteContactById(req.params);
  if (delelteContact === null) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json({ message: "contact deleted" });
};

module.exports = {
  listContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  updateContactController,
};
