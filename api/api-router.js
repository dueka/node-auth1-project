const router = require("express").Router();

const authRouter = require("../auth/auth-router.js");
const usersRouter = require("../users/users-router.js");

router.use("/auth", authRouter);
router.usse("/users", usersRouter);

router.get("/", (req, res) => {
  res.json({ api: "It's alive" });
});

module.exports = router;
