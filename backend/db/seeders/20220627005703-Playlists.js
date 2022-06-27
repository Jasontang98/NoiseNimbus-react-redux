'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Playlists', [{
        userId: 4,
        title: "Jason's playlist"
      }], {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Playlists', null, {});
  }
};
