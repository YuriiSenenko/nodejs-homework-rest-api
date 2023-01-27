const express = require("express");
const { bodyValidation } = require("../../middlewares/validationMiddleware");

const {
  listContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  updateContactController,
} = require("../../controllers/postController");

const { asyncWrapper } = require("../../helpers/apiHelpers");
const router = express.Router();

router.get("/", asyncWrapper(listContactsController));
router.get("/:contactId", asyncWrapper(getContactByIdController));
router.post("/", bodyValidation, asyncWrapper(addContactController));
router.put(
  "/:contactId",
  bodyValidation,
  asyncWrapper(updateContactController)
);
router.delete("/:contactId", asyncWrapper(removeContactController));

module.exports = router;
