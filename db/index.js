const mongoose = require('mongoose');

require('dotenv').config();

const uriDb = process.env.URI_DB;

const db = mongoose.connect(uriDb, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Database connection successful');
});

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose connection error:${err.message}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Connection for DB disconnected and app terminated');
    process.exit(1);
  });
});

module.exports = db;
// const low = require('lowdb');
// const FileSync = require('lowdb/adapters/FileSync');
// const path = require('path');

// const adapter = new FileSync(
//   path.join(__dirname, '..', 'data', 'contacts.json')
// );
// console.log(path.join(__dirname, '..', 'data', 'contacts.json'));

// const db = low(adapter);

// db.defaults({ contacts: [] }).write();

// module.exports = db;
