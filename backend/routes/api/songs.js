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
    const {title, userId} = req.body;
    const url = await singlePublicFileUpload(req.file);
    const song = await db.Song.build({
        title,
        userId,
        url
    });

    if (song) {
        await song.save();
        return res.json(song);
    };
});


router.put('/Songs', async(req, res) => {
    const { songId, title } = req.body;
    const editSong = await db.Song.findByPk(songId);

    const newSong = await editSong.update({
        title
    });

    if (newSong) {
        return res.json(newSong);
    };
});


router.delete('/Songs/:id', async(req, res) => {
    const songId = req.params.id;

    const deleteSong = await db.Song.findByPk(songId);

    await deleteSong.destroy();
    return res.json({ message: "Deleted"});
});

module.exports = router;
