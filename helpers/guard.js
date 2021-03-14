const contacts = 'model/contacts.json';
const fs = require('fs/promises');

const guard = async (req, res, next) => {
  console.log('dkfjgdfjlgndfjgn');
  try {
    const listContacts = await fs.read(contacts, 'utf-8');
    console.log('listContacts', listContacts);
  } catch (e) {
    next(e);
  }
};

module.exports = guard;
