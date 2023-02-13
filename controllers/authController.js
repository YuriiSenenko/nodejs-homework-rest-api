const {
  registrationUser,
  loginUser,
  logoutUser,
  currentUser,
  updateUserSubscription,
  editUserAvatar,
} = require("../servises/authService");
const gravatar = require("gravatar");
const path = require("path");

const registrationUserController = async (req, res, next) => {
  const { email, password, subscription } = req.body;
  const avatarUrl = gravatar.url(email);
  const user = await registrationUser(email, password, subscription, avatarUrl);
  res.status(201).json({ user });
};

const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  const user = await loginUser(email, password);
  res.status(200).json(user);
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
  const pathAvatar = path.join("public", "avatars", `${id}_${originalname}`);
  const avatarURL = path.join(
    `http://localhost:${process.env.PORT}`,
    "avatars",
    `${id}_${originalname}`
  );
  console.log(avatarURL);

  const result = await editUserAvatar(tmpUpload, pathAvatar, id, avatarURL);
  res.status(200).json(result);
};

module.exports = {
  registrationUserController,
  loginController,
  logoutController,
  currentController,
  updateUserSubscriptionController,
  editUserAvatarController,
};
