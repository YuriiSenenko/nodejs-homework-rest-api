const {
  registrationUser,
  loginUser,
  verification,
  reVerification,
  logoutUser,
  currentUser,
  updateUserSubscription,
  editUserAvatar,
} = require("../servises/authService");
const gravatar = require("gravatar");
const path = require("path");
require("dotenv").config();
const PORT = process.env.PORT;

const registrationUserController = async (req, res, next) => {
  const { email, password, subscription } = req.body;
  const avatarUrl = gravatar.url(email);
  const user = await registrationUser(email, password, subscription, avatarUrl);
  res.status(201).json({ user });
};

const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await loginUser(email, password);
  res.status(200).json(user);
};

const verificationController = async (req, res, next) => {
  const { verificationToken } = req.params;
  const result = await verification(verificationToken);
  res.status(200).json(result);
};
const reVerificationController = async (req, res, next) => {
  const { email } = req.body;
  const result = await reVerification(email);
  res.status(200).json(result);
};

const logoutController = async (req, res, next) => {
  const { _id } = req.user;
  await logoutUser(_id);
  res.status(204).json();
};

const currentController = async (req, res, next) => {
  const { _id } = req.user;

  const user = await currentUser(_id);
  res.status(200).json(user);
};

const updateUserSubscriptionController = async (req, res, next) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  const newSubscription = await updateUserSubscription(_id, subscription);
  res.status(200).json(newSubscription);
};

const editUserAvatarController = async (req, res, next) => {
  const { _id: id } = req.user;
  const { path: tmpUpload, originalname } = req.file;
  const newName = `${id}_${originalname}`;
  const newPath = path.join(__dirname, "../", "public", "avatars", newName);
  const avatarURL = `http://localhost:${PORT}/avatars/${newName}`;

  const result = await editUserAvatar(tmpUpload, id, newPath, avatarURL);
  res.status(200).json(result);
};

module.exports = {
  registrationUserController,
  loginController,
  verificationController,
  reVerificationController,
  logoutController,
  currentController,
  updateUserSubscriptionController,
  editUserAvatarController,
};
