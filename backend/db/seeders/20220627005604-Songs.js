'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Songs', [
      {
        userId: 4,
        url:
          "https://noisenimbus.s3.us-west-1.amazonaws.com/ILLENIUM+Tom+DeLonge+Angels+%26+Airwaves+-+Paper+Thin+(Official+Audio).mp4",
        title: "Paper Thin",
      },
      {
        userId: 4,
        url:
          "https://noisenimbus.s3.us-west-1.amazonaws.com/keshi+-+B.Y.S.+(Audio).mp4",
        title: "B.Y.S.",
      },
      {
        userId: 4,
        url:
          "https://noisenimbus.s3.us-west-1.amazonaws.com/Playboi+Carti+-+Shoota+(Audio)+ft.+Lil+Uzi+Vert.mp4",
        title: "Shoota",
      },
      {
        userId: 4,
        url:
          "https://noisenimbus.s3.us-west-1.amazonaws.com/'Till+I+Collapse.mp4",
        title: "'Till I Collapse",
      },
      {
        userId: 4,
        url:
          "https://noisenimbus.s3.us-west-1.amazonaws.com/Bad+Bunny+-+Me+Porto+Bonito+(Letra+Lyrics)+(ft.+Chencho+Corleone)+Un+Verano+Sin+Ti.mp4",
        title: "Me Porto Bonito",
      },
      {
        userId: 4,
        url:
          "https://noisenimbus.s3.us-west-1.amazonaws.com/Yung+Gravy+-+Betty+(Get+Money)+(Lyrics).mp4",
        title: "Betty",
      },
      {
        userId: 4,
        url:
          "https://noisenimbus.s3.us-west-1.amazonaws.com/Coast+Contra+-+AF1+(Official+Lyric+Video).mp4",
        title: "AF1",
      },
      {
        userId: 4,
        url:
          "https://noisenimbus.s3.us-west-1.amazonaws.com/Hozier+-+Arsonist's+Lullaby.mp4",
        title: "Arsonist's Lullaby",
      },
      {
        userId: 4,
        url:
          "https://noisenimbus.s3.us-west-1.amazonaws.com/REASON+-+Extinct+ft.+Isaiah+Rashad+%26+JID.mp4",
        title: "Extinct",
      },
      {
        userId: 4,
        url:
          "https://noisenimbus.s3.us-west-1.amazonaws.com/Sam+Smith+-+Fire+On+Fire+(Lyrics).mp4",
        title: "Fire On Fire",
      },
      {
        userId: 4,
        url:
          "https://noisenimbus.s3.us-west-1.amazonaws.com/Remember+the+Name+-+Fort+Minor+lyrics.mp4",
        title: "Fort Minor",
      },
      {
        userId: 4,
        url:
          "https://noisenimbus.s3.us-west-1.amazonaws.com/Moneybagg+Yo+-+Time+Today+(Lyrics).mp4",
        title: "Time Today",
      },

    ], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Songs', null, {});
  }
};
