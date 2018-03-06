const server = require('../../src/server');
const Models = require('../../models');
const sinon = require('sinon');
const urlGenerator = require('../../src/helpers/urlGenerator');

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
      expect(response.result.shorturl.length).toBe(6);
      done();
    });
  });
  it('testing with repeated long url, should return short url', (done) => {
    Models.tinyurl.create({ longurl: 'www.facebook.com', shorturl: 'ZgMop_' })
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
          expect(response.result.shorturl.length).toBe(6);
          done();
        });
      });
  });
  it('testing with long url which generates existing short url, should return different short url', (done) => {
    console.log(urlGenerator.generateShortUrl);
    const stubfn = sinon.stub(urlGenerator, 'generateShortUrl');
    stubfn.withArgs('www.google.com', 0, 6).returns('abcdef');
    stubfn.withArgs('www.amazon.com', 0, 6).returns('abcdef');
    stubfn.withArgs('www.amazon.com', 6, 6).returns('ghijkl');

    const options = {
      url: '/createShortUrl',
      method: 'POST',
      payload: {
        longUrl: 'www.google.com',
      },
    };
    server.inject(options, (response) => {
      console.log('response:', response.result.shorturl);
      expect(response.result.shorturl).toMatch('abcdef');

      const opt = {
        url: '/createShortUrl',
        method: 'POST',
        payload: {
          longUrl: 'www.amazon.com',
        },
      };
      server.inject(opt, (response2) => {
        console.log('response2', response2.result.shorturl);
        expect(response2.result.shorturl).toMatch('ghijkl');
        done();
      });
    });
  }, 30000);
});
