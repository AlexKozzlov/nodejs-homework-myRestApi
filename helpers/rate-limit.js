const rateLimit = require('express-rate-limit');
const { HttpCode } = require('./constants');
const { ErrorHandler } = require('../helpers/errorHandler');

const createAccountLimiter = rateLimit({
  windowMs: 90000,
  max: 5,
  headers: (req, res, next) => {
    next(
      new ErrorHandler(
        HttpCode.BAD_REQUEST,
        'API access limit exceeded. Try to lete'
      )
    );
  },
});

module.exports = { createAccountLimiter };
