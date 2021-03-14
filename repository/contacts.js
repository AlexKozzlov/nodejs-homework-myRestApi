const { v4: uuid } = require('uuid');
const db = require('../db');

class ContactsRepository {
  //   constructor() {}
  listContacts() {
    return db.get('contacts').value();
  }

  getContactById(id) {
    return db.get('contacts').find({ id }).value();
  }

  addContact(body) {
    const id = uuid();
    const record = {
      id,
      ...body,
    };

    db.get('contacts').push(record).write();
    return record;
  }

  removeContact(contactId) {
    const [record] = db.get('contacts').remove({ contactId }).write();
    return record;
  }

  updateContact(contactId, body) {
    const record = db.get('contacts').find({ contactId }).assign(body).value();
    db.write();
    return record.id ? record : null;
  }
}

module.exports = ContactsRepository;
