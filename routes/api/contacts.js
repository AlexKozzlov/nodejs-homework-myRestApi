const express = require('express');
const controllerContacts = require('../../controllers/contacts');
const {
  validateCreateContact,
  validateUpdateContact,
} = require('../../validation/contacts');

const router = express.Router();

router
  .get('/', controllerContacts.listContacts)
  .get('/:contactId', controllerContacts.getContactById)
  .post('/', validateCreateContact, controllerContacts.addContact)
  .delete('/:contactId', controllerContacts.removeContact)
  .patch(
    '/:contactId',
    validateUpdateContact,
    controllerContacts.updateContact
  );

module.exports = router;
