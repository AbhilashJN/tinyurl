const Models = require('../../models');
const Server = require('../../src/server');

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
        console.log('response after fetch', responseAfterFetch.result);
        console.log(responseAfterFetch.result);
        expect(responseAfterFetch.result.longurl).toMatch('http://google.co.in');
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
});
