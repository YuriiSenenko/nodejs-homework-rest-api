const express = require("express");
const { asyncWrapper } = require("../../helpers/apiHelpers");
const { userValidation } = require("../../middlewares/validationMiddleware");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const { uploadMiddleware } = require("../../middlewares/avatarMiddleware");

const {
  registrationUserController,
  loginController,
  logoutController,
  currentController,
  updateUserSubscriptionController,
  editUserAvatarController,
} = require("../../controllers/authController");

const router = express.Router();

router.post(
  "/register",
  userValidation,
  asyncWrapper(registrationUserController)
);
router.get("/login", userValidation, asyncWrapper(loginController));
router.post("/logout", authMiddleware, asyncWrapper(logoutController));
router.get("/current", authMiddleware, asyncWrapper(currentController));
router.patch(
  "/",
  authMiddleware,
  asyncWrapper(updateUserSubscriptionController)
);
router.patch(
  "/avatars",
  [authMiddleware, uploadMiddleware.single("avatar")],
  asyncWrapper(editUserAvatarController)
);
module.exports = router;
