'use strict';
module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define('Playlist', {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING
  }, {});
  Playlist.associate = function(models) {
    Playlist.belongsTo(models.User, { foreignKey: 'userId' });
    Playlist.belongsToMany(models.Song, {
      through: "SongPlaylist",
      otherKey: "songId",
      foreignKey: "playlistId",
      onDelete: "CASCADE",
      hooks: true
    })
  };
  return Playlist;
};
