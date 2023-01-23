const express = require("express");
const {
  addContactValidation,
  putValidation,
} = require("../../middlewares/validationMiddleware");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.json({ contacts });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contactById = await getContactById(contactId);
  if (!contactById) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json({ contactById });
});

router.post("/", addContactValidation, async (req, res, next) => {
  const addedContact = await addContact(req.body);
  res.status(201).json({ data: { addedContact } });
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const delelteContact = await removeContact(contactId);
  if (delelteContact === Error) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json({ message: "contact deleted" });
});

router.put("/:contactId", putValidation, async (req, res, next) => {
  const { contactId } = req.params;
  const fixContact = await updateContact(contactId, req.body);

  res.json({ data: { fixContact } });
});

module.exports = router;
