const express = require('express');

const controllerContacts = require('../../controllers/contacts');
const guard = require('../../helpers/guard');

const {
  validateCreateContact,
  validateUpdateContact,
} = require('../../validation/contacts');

const router = express.Router();

router
  .get('/', guard, controllerContacts.listContacts)
  .get('/:contactId', guard, controllerContacts.getContactById)
  .post('/', guard, validateCreateContact, controllerContacts.addContact)
  // .post('/', controllerContacts.addContact)
  .delete('/:contactId', guard, controllerContacts.removeContact)
  .patch(
    '/:contactId',
    guard,
    validateUpdateContact,
    controllerContacts.updateContact
  );

module.exports = router;
