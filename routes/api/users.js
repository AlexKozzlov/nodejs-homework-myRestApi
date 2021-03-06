const express = require('express');
const controllerUsers = require('../../controllers/users');
const guard = require('../../helpers/guard');
const { upload } = require('../../helpers/multer');
const { createAccountLimiter } = require('../../helpers/rate-limit');

const router = express.Router();

router.post('/registration', createAccountLimiter, controllerUsers.reg);
router.post('/login', controllerUsers.login);
router.post('/logout', guard, controllerUsers.logout);
router.get('/current', guard, controllerUsers.current);
router.get('/verify/:token', controllerUsers.verify);

router.patch(
  '/avatars',
  guard,
  upload.single('avatar'),
  controllerUsers.avatars
);

module.exports = router;
