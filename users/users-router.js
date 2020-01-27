const router = require("express").Router();
const { protected } = require("../auth/auth-router");
const Users = require("./users-model.js");

router.get("/users", protected, (req, res) => {
  Users.getUsers()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to retrieve users" });
    });
});

module.exports = router;
