const server = require('../../src/server');
const Models = require('../../models');

describe('Testing the createShortUrl route', () => {
  beforeAll((done) => {
    Models.tinyurl.destroy({ truncate: true, restartIdentity: true })
      .then(() => { done(); });
  });
  afterAll((done) => {
    Models.tinyurl.destroy({ truncate: true, restartIdentity: true })
      .then(() => { done(); });
  });
  it('testing with sample long url, should return short url', (done) => {
    const options = {
      url: '/createShortUrl',
      method: 'POST',
      payload: {
        longUrl: 'www.demourlabc.com',
      },
    };
    server.inject(options, (response) => {
      console.log(response.result);
      expect(response.result.shorturl).toMatch('57e855');
      done();
    });
  });
  it('testing with repeated long url, should return short url', (done) => {
    Models.tinyurl.create({ longurl: 'www.facebook.com', shorturl: '660328' })
      .then(() => {
        const options = {
          url: '/createShortUrl',
          method: 'POST',
          payload: {
            longUrl: 'www.facebook.com',
          },
        };
        server.inject(options, (response) => {
          console.log(response.result.shorturl);
          expect(response.result.shorturl).toMatch('660328');
          done();
        });
      });
  });
  it('testing with long url which generates existing short url, should return different short url', (done) => {
    Models.tinyurl.create({ longurl: 'www.amazon.com', shorturl: 'c43958' })
      .then(() => {
        const options = {
          url: '/createShortUrl',
          method: 'POST',
          payload: {
            longUrl: 'www.microsoft.com',
          },
        };
        server.inject(options, (response) => {
          console.log(response.result.shorturl);
          expect(response.result.shorturl).toMatch('940021');
          done();
        });
      });
  });
});
