const express = require("express");
const { asyncWrapper } = require("../../helpers/apiHelpers");
const {
  userValidation,
  reVerificationValidation,
} = require("../../middlewares/validationMiddleware");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const { uploadMiddleware } = require("../../middlewares/avatarMiddleware");

const {
  registrationUserController,
  loginController,
  verificationController,
  reVerificationController,
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
router.get("/verify/:verificationToken", asyncWrapper(verificationController));
router.post(
  "/verify/",
  reVerificationValidation,
  asyncWrapper(reVerificationController)
);
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
