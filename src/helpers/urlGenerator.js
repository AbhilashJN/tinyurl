const crypto = require('crypto');


const generateUrlPairs = (longUrls) => {
  const urlPairs = [];
  const shortUrls = new Set();
  longUrls.forEach((longUrl) => {
    const hash = crypto.createHash('md5').update(longUrl).digest('hex').slice(0, 6);
    if (!shortUrls.has(hash)) {
      shortUrls.add(hash);
      urlPairs.push({ longurl:longUrl, shorturl: hash, createdAt: new Date(),updatedAt: new Date() });
    }
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
  generateUrlPairs,
};

