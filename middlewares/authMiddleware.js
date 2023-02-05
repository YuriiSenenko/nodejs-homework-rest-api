const jwt = require("jsonwebtoken");
const { NotAutorizedError } = require("../helpers/errors");
const { User } = require("../db/userModel");

const authMiddleware = async (req, res, next) => {
  if (!req.headers.authorization) {
    next(new NotAutorizedError("Not authorized"));
    return;
  }
  const [tokenType, token] = req.headers.authorization.split(" ");

  if (!token) {
    next(new NotAutorizedError("Not authorized"));
  }

  try {
    const user = jwt.decode(token, process.env.JWT_SECRET);
    const id = user._id;
    const searchUser = await User.findById(id);
    if (searchUser.token !== token) {
      next(new NotAutorizedError("Not authorized"));
    }
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    next(new NotAutorizedError("Not authorized"));
  }
};

module.exports = { authMiddleware };
