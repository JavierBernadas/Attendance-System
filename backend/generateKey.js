// to run this  file  ->  node generateKey.js
// then get the code store to the .env ! ! !

const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');
console.log(secretKey + "KEY ! ");