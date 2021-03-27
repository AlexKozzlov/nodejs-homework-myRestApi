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
const fs = require('fs').promises;

const Jimp = require('jimp');

const contactsRouter = require('./routes/api/contacts');
const usersRouter = require('./routes/api/users');

const multer = require('multer');

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

// ____________________________________________________________________________

//
//
//
//
const UPLOAD_DIR = path.join(__dirname, process.env.UPLOAD_DIR);
const IMG_DIR = path.join(__dirname, 'public', 'images');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fieldSize: 10000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image')) {
      cb(null, true);
      return;
    }

    cb(null, false);
  },
});

//
//
//
//
// _____________________________________________________________________________

app.use(express.static(path.join(__dirname, 'public')));

app.post('/upload', upload.single('avatar'), async (req, res, next) => {
  console.log(`req.file`, req.file);
  console.log(`req.body`, req.body);
  const { file } = req;
  if (file) {
    const img = await Jimp.read(file.path);
    await img
      .autocrop()
      .cover(
        250,
        250,
        Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(file.path);
    await fs.rename(file.path, path.join(IMG_DIR, file.filename));
  }
  res.redirect('/');
});

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

// app.use((err, req, res, next) => {
//   res.status(500).json({ message: err.message });
// });

module.exports = app;
