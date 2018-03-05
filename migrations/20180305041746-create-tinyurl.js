

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('tinyurls', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    longurl: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    shorturl: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('tinyurls'),
};
