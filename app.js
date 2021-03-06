const express = require('express');
const path = require('path');
require('dotenv').config();
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { ErrorHandler } = require('./helpers/errorHandler');
const { apiLimit } = require('./config/rate-limit.json');
const { HttpCode } = require('./helpers/constants');

const contactsRouter = require('./routes/api/contacts');
const usersRouter = require('./routes/api/users');

const app = express({ limit: 10000 });

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

const limiter = rateLimit({
  ...apiLimit,
  handler: (req, res, next) => {
    next(new ErrorHandler(HttpCode.BAD_REQUEST, 'API access limit exceeded'));
  },
});
app.use(helmet());

app.use(limiter);

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', usersRouter);
app.use('/api/contacts', contactsRouter);

app.use((req, res, next) => {
  res.status(HttpCode.NOT_FOUND).json({
    status: 'error',
    code: HttpCode.NOT_FOUND,
    message: 'Not found',
    data: 'Not found',
  });
});
app.use((err, req, res, next) => {
  err.status = err.status ? err.status : HttpCode.INTERNAL_SERVER_ERROR;
  res.status(err.status).json({
    status: err.status === 500 ? 'fail' : 'error',
    code: err.status,
    massage: err.message,
    data: err.status === 500 ? 'Internal Server Errpr' : err.data,
  });
});

module.exports = app;
