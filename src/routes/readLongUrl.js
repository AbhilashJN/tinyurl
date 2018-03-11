const Models = require('../../models');
const redis = require('redis');

const client = redis.createClient();

module.exports = [
  {
    method: 'GET',
    path: '/readLongUrl/{shortUrl}',
    handler: (request, response) => {
      const { shortUrl } = request.params;
      client.hget('shortUrlHash', shortUrl, (err, value) => {
        console.log('redis', err, value);
        if (value === null) {
          Models.tinyurl.find({ where: { shorturl: shortUrl } }).then((res) => {
            if (res === null) {
              response('Not found');
            } else {
              client.hset('shortUrlHash', res.dataValues.shorturl, res.dataValues.longurl, redis.print);
              response(res.dataValues.longurl);
            }
          });
        } else {
          response(value);
        }
      });
    },
  },
];
