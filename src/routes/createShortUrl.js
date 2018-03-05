const crypto = require('crypto');
const Models = require('../../models');

module.exports = [
  {
    path: '/createShortUrl',
    method: 'POST',
    handler: (request, reply) => {
      const longUrl = request.payload.longUrl;
      let i = 0;

      const shortUrl = crypto.createHash('md5').update(longUrl).digest('hex').slice(i, i + 6);
      Models.tinyurl.findOrCreate({ where: { shorturl: shortUrl }, defaults: { longurl: longUrl } })
        .spread((urlRow, created) => {
          if (created) {
            reply(urlRow.dataValues);
          } else {
            i += 6;
          }
        });
    },
  },
];
