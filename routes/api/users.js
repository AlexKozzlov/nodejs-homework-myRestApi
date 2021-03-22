const express = require('express');
const controllerUsers = require('../../controllers/users');
const guard = require('../../helpers/guard');

// const {
//   validateCreateContact,
//   validateUpdateContact,
// } = require('../../validation/contacts');

const router = express.Router();

router.post('/registration', controllerUsers.reg);
router.post('/login', controllerUsers.login);
router.post('/logout', guard, controllerUsers.logout);
module.exports = router;
