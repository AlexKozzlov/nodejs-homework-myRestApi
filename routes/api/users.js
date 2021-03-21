const express = require('express');
const controllerUsers = require('../../controllers/users');

// const {
//   validateCreateContact,
//   validateUpdateContact,
// } = require('../../validation/contacts');

const router = express.Router();

router.post('/registration', controllerUsers.reg);
router.post('/login', controllerUsers.login);
router.post('/logout', controllerUsers.logout);
module.exports = router;
