const jwt = require("jsonwebtoken");
const { NotAutorizedError } = require("../helpers/errors");
const { User } = require("../db/userModel");

const authMiddleware = async (req, res, next) => {
  try {
    const [tokenType, token] = req.headers.authorization.split(" ");
    if (!token) {
      next(new NotAutorizedError("Not authorized"));
    }
    const tokenData = jwt.verify(token, process.env.JWT_SECRET);
    if (!tokenData) {
      next(new NotAutorizedError("Not authorized"));
    }
    const user = await User.findById(tokenData._id, "-password -__v");
    if (!user) {
      next(new NotAutorizedError("Not authorized"));
    }

    req.user = user;
    next();
  } catch (error) {
    next(new NotAutorizedError("Not authorized"));
  }
};

module.exports = { authMiddleware };
