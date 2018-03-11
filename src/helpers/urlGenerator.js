const crypto = require('crypto');


const generateShortUrl = (longUrl, startIndex, length) => {
  const hash = crypto.createHash('md5').update(longUrl).digest('base64').replace(/\//g, '_');
  return hash.slice(startIndex, startIndex + length);
};


const generateUrlPairs = (longUrls) => {
  const urlPairs = [];
  const shortUrls = new Set();
  longUrls.forEach((longUrl) => {
    let hash = crypto.createHash('md5').update(longUrl).digest('base64').replace(/\//g, '_')
      .slice(0, 6);
    let i = 0;
    while (shortUrls.has(hash)) {
      hash = crypto.createHash('md5').update(longUrl).digest('base64').replace(/\//g, '_')
        .slice(i, i + 6);
      i += 6;
    }
    shortUrls.add(hash);


    urlPairs.push({
      longurl: longUrl, shorturl: hash, createdAt: new Date(), updatedAt: new Date(),
    });
  });
  return urlPairs;
};

const generateLongUrls = () => {
  const longUrls = [];
  for (let i = 0; i < 1000000; i += 1) {
    const url = `www.demourl${i}.com`;
    longUrls.push(url);
  }

  return longUrls;
};


module.exports = {
  generateLongUrls,
  generateShortUrl,
  generateUrlPairs,
};

