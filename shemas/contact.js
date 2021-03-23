const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { Schema, SchemaTypes } = mongoose;

const contactShema = new Schema(
  {
    name: {
      type: String,
      min: 2,
      max: 50,
      require: [true, 'Name contact is required'],
    },
    email: {
      type: String,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address',
      ],
    },
    phone: {
      type: String,
      min: 6,
      max: 25,
    },

    user: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true }
);

// module.exports = contactShema;
contactShema.plugin(mongoosePaginate);
const ContactModel = mongoose.model('contact', contactShema);
ContactModel.paginate().then({}); // Usage

module.exports = ContactModel;
