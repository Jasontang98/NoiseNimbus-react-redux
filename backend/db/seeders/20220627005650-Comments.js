'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Comments', [{
        userId: 1,
        songId: 1,
        body: "OMG THIS IS MY FAVORITE SONG!!! 🔥🔥🔥💯💯💯"
      },
      {
        userId: 2,
        songId: 1,
        body: "In all honesty it's pretty mid."
      },
      {
        userId: 4,
        songId: 1,
        body: "At 2:31 I literally cried."
      },
      {
        userId: 3,
        songId: 2,
        body: "🔥🔥🔥🔥🔥🔥💯"
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Comments', null, {});
  }
};
