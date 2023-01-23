const express = require("express");
const Joi = require("joi");

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

router.post("/", async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    phone: Joi.number().required(),
  });
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({
      message: "missing required name field",
    });
  }

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

router.put("/:contactId", async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    phone: Joi.string().alphanum().required(),
  });
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ message: "missing fields" });
  }
  const { contactId } = req.params;
  const fixContact = await updateContact(contactId, req.body);

  res.json({ data: { fixContact } });
});

module.exports = router;
