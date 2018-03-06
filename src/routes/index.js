const createShortUrl = require('./createShortUrl');
const readLongUrl = require('../routes/readLongUrl');

module.exports = [].concat(createShortUrl, readLongUrl);

