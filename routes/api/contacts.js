const express = require('express');
const controllerContacts = require('../../controllers/contacts');
// const { listContacts, getContactById } = require('../../model');
const router = express.Router();
// const path = require('path');
// const guard = require('../../helpers/guard');

// router.get('/', async (req, res, next) => {
//   const getListContacts = await listContacts();

//   res.json({
//     status: 'success',
//     code: 200,
//     data: { getListContacts },
//   });
// });
router
  .get('/', controllerContacts.listContacts)
  .get('/:contactId', controllerContacts.getContactById)
  .post('/', controllerContacts.addContact)
  .delete('/:contactId', controllerContacts.removeContact)
  .patch('/:contactId', controllerContacts.updateContact);
// router.get('/:contactId', async (req, res, next) => {
//   const ContactById = await getContactById(req.params.contactId);
//   // console.log('ContactById', ContactById);
//   res.json({ status: 'success', code: 200, data: { ContactById } });
// });

// router.post('/', async (req, res, next) => {
//   res.json({ message: 'template message' });
// });

// router.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' });
// });

// router.patch('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' });
// });

module.exports = router;
