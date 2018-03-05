const server = require('../../src/server');


describe('Testing the createShortUrl route', () => {
  it('testing with sample long url, should return short url', (done) => {
    const options = {
      url: '/createShortUrl',
      method: 'POST',
      payload: {
        longUrl: 'www.demourlabc.com',
      },
    };
    server.inject(options, (response) => {
      console.log(response.payload);
      expect(response.payload).not.toBe(null);
    });
  });
});
