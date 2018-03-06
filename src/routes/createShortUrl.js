const crypto = require('crypto');
const Models = require('../../models');
const urlGenerators = require('../helpers/urlGenerator');

const insertOrFind = (longUrl, startIndex) => {
  const short = urlGenerators.generateShortUrl(longUrl, startIndex, 6);
  console.log(short);
  return Models.tinyurl.createObject(longUrl, short)
    .spread((urlRow, created) => {
      if (created) {
        return (urlRow.dataValues);
      }

      if (urlRow.dataValues.longurl === longUrl) {
        return (urlRow.dataValues);
      }

      return insertOrFind(longUrl, startIndex + 6);
    });
};


module.exports = [
  {
    path: '/createShortUrl',
    method: 'POST',
    handler: (request, reply) => {
      const { longUrl } = request.payload;
      const result = insertOrFind(longUrl, 0);
      result.then(reply);
    },
  },
];
