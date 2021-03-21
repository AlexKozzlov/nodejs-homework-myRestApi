const mongoose = require('mongoose');
const contactShema = require('./shemas/contactSchema');

const ContactModel = mongoose.model('contact', contactShema);
module.exports = ContactModel;
