const urlGenerator = require('../src/helpers/urlGenerator');

describe('testing url generators', () => {
  it('testing longUrl generator', () => {
    const longUrls = urlGenerator.generateLongUrls();
    console.log(longUrls);
    expect(longUrls.length).toBe(1000000);
  });

  it('testing urlPair generator', () => {
    const longUrls = urlGenerator.generateLongUrls();
    const urlPairs = urlGenerator.generateUrlPairs(longUrls);
    console.log(urlPairs);
    expect(longUrls.length).toBeLessThanOrEqual(1000000);
  });
});
