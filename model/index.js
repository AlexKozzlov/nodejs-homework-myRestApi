const fs = require('fs/promises');
// const createError = require('http-errors');
// const contacts = require('./contacts.json');
const contacts = 'model/contacts.json';

const listContacts = async () => {
  return fs
    .readFile(contacts, 'utf-8')
    .then((data) => JSON.parse(data))
    .catch((err) => console.log('error', err));
};

const getContactById = async (contactId, next) => {
  return (
    fs
      .readFile(contacts, 'utf-8')
      .then((data) => JSON.parse(data))
      // .then((data) => data.map((item) => console.log('item', item.id, contactId)))
      .then((data) => {
        // console.log('not Found');
        const contactById = data.find((item) => item.id === +contactId);
        console.log('contactById', contactById);
        if (!contactById) {
          const error = new Error('My404');
          error.code = 404;
          throw error;
          // throw new Error((status = 404));
          // next(createError(404));
        }
        return contactById;
      })
      // .catch((error) => {
      //   throw error;
      // })
      .catch((error) => {
        // return new Error(404);
        console.log('error', error);
      })
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
