const Models = require('../../models');
const Server = require('../../src/server');
const redis = require('redis');

const client = redis.createClient();
beforeEach(done => Models.tinyurl.destroy({ truncate: true }).then(() => { done(); }));
afterEach(done => Models.tinyurl.destroy({ truncate: true }).then(() => { done(); }));
afterAll(() => Models.close());

describe('Testing /getLongUrl', () => {
  it('Testing with a short URL for its uniqueness', (done) => {
    const optionsForSeedingShortURL = {
      method: 'POST',
      url: '/createShortUrl',
      payload: { longUrl: 'http://google.co.in' },
    };

    Server.inject(optionsForSeedingShortURL, (responseAfterSeed) => {
      console.log('seed', responseAfterSeed.result);
      const optionsForFetchingLongURL = {
        method: 'GET',
        url: `/readLongUrl/${responseAfterSeed.result.shorturl}`,
      };
      Server.inject(optionsForFetchingLongURL, (responseAfterFetch) => {
        console.log('response after fetch', responseAfterFetch.payload);
        console.log(responseAfterFetch.payload);
        expect(responseAfterFetch.payload).toMatch('http://google.co.in');
        done();
      });
    });
  });
  it('Testing with a short URL which is not in the table', (done) => {
    const options = {
      method: 'GET',
      url: '/readLongUrl/123abc',

    };
    Server.inject(options, (response) => {
      expect(response.payload).toMatch('Not found');
      done();
    });
  });
  it('Testing a url which is not in cache', (done) => {
    const optionsForSeedingShortURL = {
      method: 'POST',
      url: '/createShortUrl',
      payload: { longUrl: 'http://abcd.co.in' },
    };

    Server.inject(optionsForSeedingShortURL, (responseAfterSeed) => {
      console.log('seed2', responseAfterSeed.result);
      const optionsForFetchingLongURL = {
        method: 'GET',
        url: `/readLongUrl/${responseAfterSeed.result.shorturl}`,
      };
      Server.inject(optionsForFetchingLongURL, (responseAfterFetch) => {
        client.hget('shortUrlHash', responseAfterSeed.result.shorturl, (err, value) => {
          console.log('redisvalue:', value);
          expect(value).toMatch('http://abcd.co.in');
        });
        client.hdel('shortUrl', responseAfterSeed.result.shorturl, (err, value) => {
          done();
        });
      });
    });
  });
});
