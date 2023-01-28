const express = require("express");
const {
  bodyValidation,
  statusValidation,
  bodyValidationForUpdate,
} = require("../../middlewares/validationMiddleware");

const {
  listContactsController,
  getContactByIdController,
  addContactController,
  updateContactController,
  updateStatusContactController,
  removeContactController,
} = require("../../controllers/postController");

const { asyncWrapper } = require("../../helpers/apiHelpers");
const router = express.Router();

router.get("/", asyncWrapper(listContactsController));
router.get("/:contactId", asyncWrapper(getContactByIdController));
router.post("/", bodyValidation, asyncWrapper(addContactController));
router.put(
  "/:contactId",
  bodyValidationForUpdate,
  asyncWrapper(updateContactController)
);
router.patch(
  "/:contactId/favorite",
  statusValidation,
  asyncWrapper(updateStatusContactController)
);
router.delete("/:contactId", asyncWrapper(removeContactController));

module.exports = router;
