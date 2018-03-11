const createShortUrl = require('./createShortUrl');
const readLongUrl = require('../routes/readLongUrl');
const ping = require('./ping');

module.exports = [].concat(createShortUrl, readLongUrl, ping);

