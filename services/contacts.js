const { ContactsRepository } = require('../repository');

class ContactsService {
  constructor() {
    this.repository = { contacts: new ContactsRepository() };
  }

  listContacts() {
    const data = this.repository.contacts.listContacts();
    return data;
  }

  getContactById({ contactId }) {
    const data = this.repository.contacts.getContactById(contactId);
    return data;
  }

  addContact(body) {
    const data = this.repository.contacts.addContact(body);
    return data;
  }

  removeContact({ contactId }) {
    const data = this.repository.contacts.removeContact(contactId);
    return data;
  }

  updateContact({ contactId }, body) {
    const data = this.repository.contacts.updateContact(contactId, body);
    return data;
  }
}

module.exports = ContactsService;
