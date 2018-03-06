const Models = require('../../models');

module.exports = [
  {
    method: 'GET',
    path: '/readLongUrl/{shortUrl}',
    handler: (request, response) => {
      const { params: { shortUrl } } = request;
      return Models.tinyurl.find({ where: { shorturl: shortUrl } }).then((res) => {
        if (res === null) {
          response('Not found');
        } else {
          response(res.dataValues);
        }
      });
    },
  },
];
