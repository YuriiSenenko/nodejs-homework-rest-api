const {
  registrationUser,
  loginUser,
  logoutUser,
  currentUser,
  updateUserSubscription,
} = require("../servises/authService");

const registrationUserController = async (req, res, next) => {
  const { email, password, subscription } = req.body;
  const user = await registrationUser(email, password, subscription);
  res.status(201).json({ user });
};

const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  const token = await loginUser(email, password);
  res.status(200).json(token);
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

module.exports = {
  registrationUserController,
  loginController,
  logoutController,
  currentController,
  updateUserSubscriptionController,
};
