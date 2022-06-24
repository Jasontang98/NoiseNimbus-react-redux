const express = require('express');
const db = require('../../db/models');
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");


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

router.post('/Songs', validateSong, async (req,res) => {

})
