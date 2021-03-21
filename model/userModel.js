const mongoose = require('mongoose');
const userSchema = require('./shemas/userSchema');

const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;
