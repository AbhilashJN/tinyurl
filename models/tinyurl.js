
module.exports = (sequelize, DataTypes) => {
  const tinyurl = sequelize.define('tinyurl', {
    longurl: DataTypes.STRING,
    shorturl: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6, 6],
          msg: 'ShortUrl must be 6 characters in length',
        },
      },
    },
  }, {});

  tinyurl.createObject = (longUrl, shortUrl) =>
    tinyurl.findOrCreate({ where: { shorturl: shortUrl }, defaults: { longurl: longUrl } });

  tinyurl.associate = function (models) {
    // associations can be defined here
  };
  return tinyurl;
};
