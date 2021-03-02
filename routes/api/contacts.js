const express = require('express');
const { listContacts, getContactById } = require('../../model');
const router = express.Router();
const path = require('path');

router.get('/', async (req, res, next) => {
  const getListContacts = await listContacts();

  res.json({
    status: 'success',
    code: 200,
    data: { getListContacts },
  });
});

router.get('/:contactId', async (req, res, next) => {
  const ContactById = await getContactById(req.params.contactId);
  console.log('ContactById', ContactById);
  res.json({ status: 'success', code: 200, data: { ContactById } });
});

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

module.exports = router;
