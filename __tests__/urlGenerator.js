const urlGenerator = require('../src/helpers/urlGenerator');
const Models = require('../models');

describe('Testing length validation of shortUrl', () => {
  it('Testing shorturl of length 7', (done) => {
    Models.tinyurl.create({ longurl: 'www.example.com', shorturl: 'abcdefg' })
      .catch((err) => { console.log(err); expect(err).not.toBe(null); done(); });
  });
  it('Testing shorturl of length 5', (done) => {
    Models.tinyurl.create({ longurl: 'www.example.com', shorturl: 'abcde' })
      .catch((err) => { console.log(err); expect(err).not.toBe(null); done(); });
  });
  // it('testing longUrl generator', () => {
  //   const longUrls = urlGenerator.generateLongUrls();
  //   console.log(longUrls);
  //   expect(longUrls.length).toBe(1000000);
  // });

  // it('testing urlPair generator', () => {
  //   const longUrls = urlGenerator.generateLongUrls();
  //   const urlPairs = urlGenerator.generateUrlPairs(longUrls);
  //   console.log(urlPairs);
  //   expect(longUrls.length).toBeLessThanOrEqual(1000000);
  // });
});
