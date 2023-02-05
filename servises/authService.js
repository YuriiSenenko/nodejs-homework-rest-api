const jwt = require("jsonwebtoken");

const {
  NotAutorizedError,
  ConflictAutorizedError,
  WrongParametersError,
} = require("../helpers/errors");
const { User } = require("../db/userModel");
const bcrypt = require("bcrypt");

const registrationUser = async (email, password, subscription) => {
  try {
    const user = new User({
      email,
      password,
      subscription,
    });
    await user.save();
    return { email: user.email, subscription: user.subscription };
  } catch (error) {
    throw new ConflictAutorizedError(`Email '${email}' in use`);
  }
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new NotAutorizedError(`Email or password is wrong`);
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  await User.findByIdAndUpdate(user._id, { token });

  return {
    token,
    user: { email: user.email, subscription: user.subscription },
  };
};

const logoutUser = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new NotAutorizedError("Not authorized");
  }
  await User.findByIdAndUpdate(id, { token: "" });
};

const currentUser = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throw new NotAutorizedError("Not authorized");
  }

  return { email: user.email, subscription: user.subscription };
};

const updateUserSubscription = async (id, subscription) => {
  const user = await User.findByIdAndUpdate(id, { subscription });
  if (!user) {
    throw new WrongParametersError(`Contact with id ${id} not found`);
  }
  return { user: user.email, subscription: user.subscription };
};

module.exports = {
  registrationUser,
  loginUser,
  logoutUser,
  currentUser,
  updateUserSubscription,
};
