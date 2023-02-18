const jwt = require("jsonwebtoken");
const fs = require("fs/promises");
const Jimp = require("jimp");
// require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const {
  sendingVerificationEmail,
  sendingConfirmationOfSuccessfulVerification,
} = require("../helpers/emailValidation");
// const sgMail = require("@sendgrid/mail");
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const {
  ContactListError,
  NotAutorizedError,
  ConflictAutorizedError,
  WrongParametersError,
} = require("../helpers/errors");
const { User } = require("../db/userModel");
const bcrypt = require("bcrypt");

const registrationUser = async (
  email,
  password,
  subscription,
  avatarURL,
  verify
) => {
  try {
    const user = new User({
      email,
      password,
      subscription,
      avatarURL,
      verify,
      verificationToken: uuidv4(),
    });
    await user.save();
    await sendingVerificationEmail(user.email, user.verificationToken);

    return {
      email: user.email,
      subscription: user.subscription,
      avatar: avatarURL,
    };
  } catch (error) {
    throw new ConflictAutorizedError(`Email '${email}' in use`);
  }
};

const verification = async (verificationToken) => {
  const user = await User.findOne({ verificationToken, verify: false });
  if (!user) {
    throw new WrongParametersError("User not found");
  }

  user.verificationToken = "null";
  user.verify = true;
  await user.save();

  await sendingConfirmationOfSuccessfulVerification(user.email);

  return { message: "Verification successful" };
};

const reVerification = async (email) => {
  if (!email) {
    throw new ContactListError("missing required field email");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new WrongParametersError("User not found");
  }
  if (user.verify) {
    throw new ContactListError("Verification has already been passed");
  }
  await sendingVerificationEmail(user.email, user.verificationToken);

  return { message: "Verification email sent" };
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email, verify: true });
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

const editUserAvatar = async (tmpUpload, id, avatarURL) => {
  try {
    await Jimp.read(tmpUpload).then((image) => {
      image.resize(250, 250).write(tmpUpload);
    });
    await fs.rename(tmpUpload, avatarURL);
    const user = await User.findByIdAndUpdate(id, { avatarURL });

    if (!user) {
      throw new WrongParametersError(`Contact with id ${id} not found`);
    }
    return { avatarURL };
  } catch (error) {
    await fs.unlink(tmpUpload);
    return error.message;
  }
};

module.exports = {
  registrationUser,
  loginUser,
  verification,
  reVerification,
  logoutUser,
  currentUser,
  updateUserSubscription,
  editUserAvatar,
};
