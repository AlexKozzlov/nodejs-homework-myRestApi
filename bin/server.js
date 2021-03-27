const app = require('../app');
const db = require('../db');
const path = require('path');
const { createFolderIsNotExist } = require('../helpers/createFolder');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
// const UPLOAD_DIR = process.env.UPLOAD_DIR;
const UPLOAD_DIR = path.join(__dirname, '../', process.env.UPLOAD_DIR);
const IMG_DIR = path.join(__dirname, '../', 'public', 'images');
db.then(() => {
  app.listen(PORT, async () => {
    // console.log(`IMG_DIR`, IMG_DIR);
    await createFolderIsNotExist(UPLOAD_DIR);
    await createFolderIsNotExist(IMG_DIR);

    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch((err) => {
  console.log(`Server not running. Erroe message: ${err.message}`);
});
