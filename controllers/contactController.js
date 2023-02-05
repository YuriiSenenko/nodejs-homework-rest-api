const {
  getContacts,
  getContactsById,
  addContact,
  updateContactById,
  updateStatusContact,
  deleteContactById,
} = require("../servises/contactService");

const getlistContactsController = async (req, res, next) => {
  const { favorite, page, limit } = req.query;

  const { _id: owner } = req.user;
  const contacts = await getContacts(owner, { favorite, page, limit });
  res.json(contacts);
};

const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const contact = await getContactsById(contactId, owner);
  res.json(contact);
};

const addContactController = async (req, res, next) => {
  const { name, email, phone, favorite } = req.body;
  const { _id: owner } = req.user;
  const newContact = await addContact(name, email, phone, favorite, owner);
  res.status(201).json(newContact);
};

const updateContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone, favorite } = req.body;
  const { _id: owner } = req.user;
  const updatedContact = await updateContactById(
    contactId,
    name,
    email,
    phone,
    favorite,
    owner
  );
  res.json(updatedContact);
};

const updateStatusContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const { _id: owner } = req.user;
  const changeFavorite = await updateStatusContact(
    contactId,
    { favorite },
    owner
  );
  res.status(200).json({ changeFavorite });
};

const removeContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const delelteContact = await deleteContactById(contactId, owner);
  if (delelteContact === null) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json({ message: "contact deleted" });
};

module.exports = {
  getlistContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  updateContactController,
  updateStatusContactController,
};
