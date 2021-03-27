const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const SALT_FACTOR = 8;
const { Subscription } = require('../helpers/constants');
const { Schema } = mongoose;
const gravatar = require('gravatar');

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    require: [true, 'Email mast be requaired'],
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },
  password: { type: String, require: [true, 'Password mast be requaired'] },
  avatarURL: {
    type: String,
    default: function () {
      return gravatar.url(this.email, { s: '250' }, true);
    },
  },
  subscription: {
    type: String,
    enum: [...Object.values(Subscription)],
    default: 'free',
  },
  token: {
    type: String,
    default: null,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(
    this.password,
    bcrypt.genSaltSync(SALT_FACTOR)
  );
  next();
});

userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// module.exports = userSchema;

const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;
