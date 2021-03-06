const router = require('express').Router();
const songsRouter = require("./songs.js");
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');


const asyncHandler = require("express-async-handler");
const { setTokenCookie } = require("../../utils/auth.js");
const { User } = require("../../db/models");
const { requireAuth } = require("../../utils/auth.js");

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use("/songs", songsRouter);


router.get(
  "/set-token-cookie",
  asyncHandler(async (_req, res) => {
    const user = await User.findOne({
      where: {
        username: "Demo-lition",
      },
    });
    setTokenCookie(res, user);
    return res.json({ user });
  })
);

const { restoreUser } = require("../../utils/auth.js");
router.get("/restore-user", restoreUser, (req, res) => {
  return res.json(req.user);
});

router.get("/require-auth", requireAuth, (req, res) => {
  return res.json(req.user);
});


module.exports = router;
