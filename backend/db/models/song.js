'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    userId: DataTypes.INTEGER,
    url: DataTypes.STRING,
    title: DataTypes.STRING
  }, {});
  Song.associate = function(models) {
    Song.belongsTo(models.User, {foreignKey: 'userId'});
    Song.hasMany(models.Comment, {foreignKey: 'songId', onDelete: 'CASCADE', hooks: true});
    Song.belongsToMany(models.Playlist, {
      through: 'SongPlaylist',
      otherkey: 'playlistId',
      foreignKey: 'songId'
    })
  };
  return Song;
};
