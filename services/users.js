const { UserRepository } = require('../repository');

class UserService {
  constructor() {
    this.repositories = { users: new UserRepository() };
  }

  async create(body) {
    const data = await this.repositories.users.addUser(body);

    return data;
  }

  async findByEmail(email) {
    const data = await this.repositories.users.findUserByEmail(email);
    return data;
  }

  async findById(id) {
    const data = await this.repositories.users.findUserById(id);
    return data;
  }
}

module.exports = UserService;
