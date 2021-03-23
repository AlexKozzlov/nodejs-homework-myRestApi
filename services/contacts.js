const { ContactsRepository } = require('../repository');

class ContactsService {
  constructor() {
    this.repository = { contacts: new ContactsRepository() };
  }

  async listContacts(userId, query) {
    const data = await this.repository.contacts.listContacts(userId, query);
    const {
      limit,
      docs: contacts,
      totalDocs: total,
      page: curentPage,
      totalPages,
    } = data;
    return { contacts, limit, totalPages, curentPage, total };
  }

  async getContactById(userId, { contactId }) {
    const data = await this.repository.contacts.getContactById(
      userId,
      contactId
    );
    return data;
  }

  async addContact(userId, body) {
    const data = await this.repository.contacts.addContact(userId, body);
    return data;
  }

  async removeContact(userId, { contactId }) {
    const data = await this.repository.contacts.removeContact(
      userId,
      contactId
    );
    return data;
  }

  async updateContact(userId, { contactId }, body) {
    const data = await this.repository.contacts.updateContact(
      userId,
      contactId,
      body
    );
    return data;
  }
}

module.exports = ContactsService;
