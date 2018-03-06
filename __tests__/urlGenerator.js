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
  it('Testing shorturl of length 6', (done) => {
    Models.tinyurl.create({ longurl: 'www.example.com', shorturl: 'abcdef' })
      .then((value) => { console.log(value.dataValues); expect(value.dataValues).not.toBe(null); done(); });
  });
});


describe('Testing unique constraint validation in the model', () => {
  beforeAll((done) => {
    Models.tinyurl.create({ longurl: 'www.example12.com', shorturl: 'qwerty' })
      .then(() => { done(); });
  });
  afterAll((done) => {
    Models.tinyurl.destroy({ truncate: true, restartIdentity: true })
      .then(() => { done(); });
  });


  it('Testing for new url, should insert successfully', (done) => {
    Models.tinyurl.create({ longurl: 'www.example12345.com', shorturl: 'c71a30' })
      .then((value) => { expect(value.dataValues).not.toBe(null); done(); });
  });

  it('Testing for repeated url, should not insert', (done) => {
    Models.tinyurl.create({ longurl: 'www.example12.com', shorturl: 'qwerty' })
      .catch((err) => { expect(err).not.toBe(null); done(); });
  });
});


describe('Testing urlGenerator functions', () => {
  it('Testing generateShortUrl function, should return string of length 6', (done) => {
    const shortUrl = urlGenerator.generateShortUrl('www.example.com', 0, 6);
    expect(shortUrl.length).toBe(6);
    done();
  });
  it('Testing if generateShortUrl function returns same short url for same longUrl', (done) => {
    const shortUrl1 = urlGenerator.generateShortUrl('www.example.com', 0, 6);
    const shortUrl2 = urlGenerator.generateShortUrl('www.example.com', 0, 6);
    expect(shortUrl1).toMatch(shortUrl2);
    done();
  });
  it('testing longUrl generator', () => {
    const longUrls = urlGenerator.generateLongUrls();
    // console.log(longUrls);
    expect(longUrls.length).toBe(1000000);
  });

  it('testing urlPair generator', () => {
    const longUrls = urlGenerator.generateLongUrls();
    const urlPairs = urlGenerator.generateUrlPairs(longUrls);
    // console.log(urlPairs);
    expect(longUrls.length).toBeLessThanOrEqual(1000000);
  });
});

