'use strict';
const urlGenerator = require('../src/helpers/urlGenerator')

module.exports = {
  up: (queryInterface, Sequelize) => {
    let longUrls = urlGenerator.generateLongUrls();
    let urlPairs = urlGenerator.generateUrlPairs(longUrls);
    return queryInterface.bulkInsert('tinyurls', urlPairs, {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tinyurls', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
