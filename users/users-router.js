const router = require("express").Router();

const Users = require("./users-model.js");

router.get("/users", (req, res) => {
  Users.getUsers()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to retrieve users" });
    });
});
