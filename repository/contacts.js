const Contact = require('../shemas/contacts');

class ContactsRepository {
  constructor() {
    this.model = Contact;
  }

  async listContacts() {
    return await this.model.find({});
  }

  async getContactById(id) {
    return await this.model.findOne({ _id: id });
  }

  async addContact(body) {
    return await this.model.create(body);
  }

  async removeContact(id) {
    return await this.model.findByIdAndRemove({ _id: id });
  }

  async updateContact(id, body) {
    const resuilt = this.model.findByIdAndUpdate(
      { _id: id },
      { ...body },
      { new: true }
    );
    return resuilt;
  }
}

module.exports = ContactsRepository;

// const { v4: uuid } = require('uuid');
// const db = require('../db');

// class ContactsRepository {
//   listContacts() {
//     return db.get('contacts').value();
//   }

//   getContactById(id) {
//     const dbres = db.get('contacts').find({ id: id }).value();
//     return dbres;
//   }

//   addContact(body) {
//     const id = uuid();
//     const record = {
//       id,
//       ...body,
//     };

//     db.get('contacts').push(record).write();
//     return record;
//   }

//   removeContact(contactId) {
//     const [record] = db.get('contacts').remove({ id: contactId }).write();
//     return record;
//   }

//   updateContact(contactId, body) {
//     const record = db
//       .get('contacts')
//       .find({ id: contactId })
//       .assign(body)
//       .value();
//     db.write();
//     return record.id ? record : null;
//   }
// }

// module.exports = ContactsRepository;
