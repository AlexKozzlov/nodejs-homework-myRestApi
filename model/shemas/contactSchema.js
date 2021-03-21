const mongoose = require('mongoose');
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
    // subscription: {
    //   type: String,
    //   default: 'free',
    // },
    // password: {
    //   type: String,
    //   min: 6,
    //   max: 50,
    //   unique: true,
    // },
    // token: {
    //   type: String,
    //   unique: true,
    // },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = contactShema;
