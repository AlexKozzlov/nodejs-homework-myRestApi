const fs = require('fs/promises');
// const contacts = require('./contacts.json');
const contacts = 'model/contacts.json';

const listContacts = async () => {
  return fs
    .readFile(contacts, 'utf-8')
    .then((data) => JSON.parse(data))
    .catch((err) => console.log('error', err));
};

const getContactById = async (contactId) => {
  return (
    fs
      .readFile(contacts, 'utf-8')
      .then((data) => JSON.parse(data))
      // .then((data) => data.map((item) => console.log('item', item.id, contactId)))
      .then((data) => data.find((item) => item.id === +contactId))
      .catch((error) => console.log('error', error))
  );
};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
