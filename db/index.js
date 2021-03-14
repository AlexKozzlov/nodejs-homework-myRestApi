const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');

const adapter = new FileSync(
  path.join(__dirname, '..', 'data', 'contacts.json')
);
console.log(path.join(__dirname, '..', 'data', 'contacts.json'));
// const adapter = new FileSync('contacts.json');
const db = low(adapter);

db.defaults({ contacts: [] }).write();

module.exports = db;
