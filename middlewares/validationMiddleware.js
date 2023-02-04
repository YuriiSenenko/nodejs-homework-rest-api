const Joi = require("joi");
const { ContactListError } = require("../helpers/errors");

module.exports = {
  bodyValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      phone: Joi.string()
        .pattern(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/)
        .required(),
      favorite: Joi.boolean(),
    });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      next(new ContactListError(validationResult.error.message));
    }
    next();
  },

  bodyValidationForUpdate: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      phone: Joi.string().pattern(
        /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/
      ),
      favorite: Joi.boolean(),
    });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      next(new ContactListError(validationResult.error.message));
    }
    next();
  },

  statusValidation: (req, res, next) => {
    const schema = Joi.object({
      favorite: Joi.boolean().required(),
    });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      next(new ContactListError(validationResult.error.message));
    }
    next();
  },

  userValidation: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      password: Joi.string().required(),
      subscription: Joi.string(),
    });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      next(new ContactListError(validationResult.error.message));
    }
    next();
  },
};
