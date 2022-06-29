const express = require('express');
const db = require('../../db/models');
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { singlePublicFileUpload, singleMulterUpload  } = require('../../awsS3');


const validateSong = [
    check("fileName")
      .exists({ checkFalsy: true })
      .isLength({ max: 50 })
      .withMessage("Song title is too long"),
    handleValidationErrors,
  ];


router.get('/Songs', async (req,res) => {
    const songs = await db.Song.findAll({
        include: [{model: db.User}, {model: db.Comment}]
    });
    return res.json(songs);
});


router.post('/Songs', singleMulterUpload('song'), validateSong, async (req,res) => {
    if (req.file.mimetype === "video/mp4" ||
        req.file.mimetype === "video/mp3") {
        }
    const url = await singlePublicFileUpload(req.file);
    const songTitle = req.body.fileName;
    const userId = req.body.userId;

    const song = await db.Song.build({
        title: songTitle,
        userId,
        url
    });

    if (song) {
        await song.save();
        return res.json(song);
    } else {
        const err = new Error("Invalid File Type");
        next(err);
    }
});


router.put('/Songs', async(req, res) => {
    const { id, songTitle } = req.body;
    console.log(req.body)
    const editSong = await db.Song.findByPk(id);

    const newSong = await editSong.update({
        title: songTitle
    });

    if (newSong) {
        return res.json(newSong);
    };
});


router.delete('/Songs/:id', async(req, res) => {
    const songId = req.params.id;

    const associations = await db.SongPlaylist.findAll({
        where: {
            songId: songId
        }
    })

    associations.forEach((association) => {
        association.destroy()
    })

    const deleteSong = await db.Song.findByPk(songId);

    await deleteSong.destroy();
    return res.json({ message: "Deleted"});
});

module.exports = router;
