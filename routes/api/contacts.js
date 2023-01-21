const express = require("express");

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
  res.json({ status: "success", code: 200, data: { contacts } });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contactById = await getContactById(contactId);
  res.json({ status: "success", code: 200, data: { contactById } });
});

router.post("/", async (req, res, next) => {
  // const { id, name, email, phone } = req.body;

  const addedContact = await addContact(req.body);
  res.json({ status: "success", code: 200, data: { addedContact } });
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  removeContact(contactId);

  res.json({ status: "success", code: 200, message: "contact deleted" });
});

router.put("/:contactId", async (req, res, next) => {
  // if (!req.body) {
  //   res.json({ status: "success", code: 400, message: "missing fields" });
  //   return;
  // }
  const { contactId } = req.params;
  const fixContact = await updateContact(contactId, req.body);
  console.log(fixContact);
  res.json({ status: "success", code: 200, data: { fixContact } });
});

module.exports = router;
