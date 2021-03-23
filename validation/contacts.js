const Joi = require('joi');
const { HttpCode } = require('../helpers/constants');

const shemaCreateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .optional(),

  phone: Joi.string().required(),
  // subscription: Joi.string().required(),
  // password: Joi.string().min(6).max(50).required(),
  // token: [Joi.string(), Joi.number(), Joi.optional()],
});

const shemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .optional(),
  phone: Joi.number().optional(),
});

const validate = (shema, body, next) => {
  const { error } = shema.validate(body);

  if (error) {
    const [{ message }] = error.details;

    return next({
      status: HttpCode.BAD_REQUEST,
      message: `Filed: ${message.replace(/"/g, '')}`,
      data: 'Bad Request',
    });
  }
  next();
};

module.exports.validateCreateContact = (req, res, next) => {
  return validate(shemaCreateContact, req.body, next);
};

module.exports.validateUpdateContact = (req, res, next) => {
  return validate(shemaUpdateContact, req.body, next);
};
