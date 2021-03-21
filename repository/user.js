const UserModel = require('../model/userModel');

class UserRepository {
  constructor() {
    this.model = UserModel;
  }

  async findUsertById(id) {
    return await this.model.findOne({ _id: id });
  }

  async findUserByEmail(email) {
    return await this.model.findOne({ email });
  }

  async addUser(body) {
    const user = new this.model(body);
    return user.save();
  }

  async updateToken(id, token) {
    await this.model.updateOne({ _id: id }, { token });
  }
}

module.exports = UserRepository;
