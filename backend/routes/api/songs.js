const express = require('express');
const db = require('../../db/models');
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3');


const validateSong = [
    check("fileName")
        .exists({ checkFalsy: true })
        .isLength({ max: 20 })
        .withMessage("Song title is too long"),
    handleValidationErrors,
];

const validateEditSong = [
    check('title')
        .exists({checkFalsy: true})
        .isLength({ min: 1})
        .isLength({ max: 20})
        .withMessage("Song title is too long"),
    handleValidationErrors,
]

router.get('/:id(\\d+)', async (req, res) => {
    const id = parseInt(req.params.id, 10)

    const oneSong = await db.Song.findOne({
        where: { id },
        include: db.User
    })
    return res.json(oneSong)
})

router.get('/', async (req, res) => {
    const songs = await db.Song.findAll({
        include: [{ model: db.User }, { model: db.Comment }]
    });
    return res.json(songs);
});


router.post('/', singleMulterUpload('song'), validateSong, async (req, res, next) => {
    console.log(res)
    if (req.file) {
        if (req.file.mimetype === "video/mp4" || req.file.mimetype === "video/mp3" ||
        req.file.mimetype === "audio/mpeg") {
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
        } else {
            const err = new Error("Please provide a valid file.")
            next(err)
        }
    }
});


router.put('/:id(\\d+)',validateEditSong, async (req, res) => {
    const id = parseInt(req.params.id, 10)
    const { title } = req.body

    const editSong = await db.Song.findByPk(id);

    const newSong = await editSong.update({
        title
    });

    if (newSong) {
        return res.json(newSong);
    };
});


router.delete('/:id(\\d+)', async (req, res) => {
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
    return res.json({ message: "Deleted" });
});


// Comments

router.get("/:id/comments", async (req, res) => {
    const songId = parseInt(req.params.id, 10);

    const getAllComments = await db.Comment.findAll({
        where: { songId: songId },
        include: db.User
    });
    if (getAllComments) {
        return res.json(getAllComments);
    }
})

router.post("/:id(\\d+)", async (req, res) => {
    const { userId, songId, body } = req.body;
    const createComment = await db.Comment.create({
        userId,
        songId,
        body
    })

    const findUser = await db.User.findByPk(userId);

    createComment.dataValues['User'] = findUser.dataValues

    return res.json(createComment);
});


router.delete("/:id(\\d+)/comments/:id(\\d+)", async (req, res) => {
    const id = parseInt(req.params.id, 10);

    const comment = await db.Comment.findByPk(id);

    if (comment) {
        await comment.destroy();
        return res.json({ message: "Deleted" })
    }
})

module.exports = router;
