const ContactModel = require('../shemas/contact');

class ContactsRepository {
  constructor() {
    this.model = ContactModel;
  }

  async listContacts(
    userId,
    { limit = 5, page = 1, sortBy, sortByDesc, filter }
  ) {
    const result = await this.model.paginate(
      { user: userId },
      {
        limit,
        page,
        sort: {
          ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
          ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
        },
        select: filter ? filter.split('|').join(' ') : '',
        populate: {
          path: 'user',
          select: 'email subscription',
        },
      }
    );
    // console.log(`result`, result);
    return result;
  }

  async getContactById(userId, id) {
    return await this.model.findOne({ _id: id, user: userId }).populate({
      path: 'user',
      select: 'email subscription',
    });
  }

  async addContact(userId, body) {
    return await this.model.create({ ...body, user: userId });
  }

  async removeContact(userId, id) {
    return await this.model.findByIdAndRemove({ _id: id, user: userId });
  }

  async updateContact(userId, id, body) {
    const resuilt = this.model.findByIdAndUpdate(
      { _id: id, user: userId },
      { ...body },
      { new: true }
    );
    return resuilt;
  }
}
// new ContactsRepository.updateAllContacts()
module.exports = ContactsRepository;
