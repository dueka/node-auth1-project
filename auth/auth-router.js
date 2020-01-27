const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("../users/users-model.js");
const uuid = require("uuid");

const activeSessions = [];

router.post("/register", (req, res) => {
  const { username, password } = req.body;

  const bcryptHash = bcrypt.hashSync(password, 10);
  const user = {
    username,
    password: bcryptHash
  };

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/login", restricted, (req, res) => {
  let { username, password } = req.body;

  Users.getBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const sessionId = uuid();
        activeSessions.push(sessionId);
        res.cookie("sessionId", sessionId, { maxAge: 900000 });

        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/users", (req, res) => {
  Users.getUsers()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to retrieve users" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Users.getUsersById(id)
    .then(users => {
      if (users) {
        res.json(users);
      } else {
        res.status(404).json({
          message: "Could not find the users"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to get users"
      });
    });
});

// Middleware
function restricted(req, res, next) {
  const { username, password } = req.headers;

  if (username && password) {
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res.status(401).json({ message: "Invalid Credentials" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: "Unexpected error" });
      });
  } else {
    res.status(400).json({ message: "No credentials Provided" });
  }
}

function protected(req, res, next) {
  if (activeSessions.includes(req.cookies.sessionId)) {
    next();
  } else {
    res
      .status(401)
      .json({
        message:
          "Your cookie is either not there or it contains no valid sessionId"
      });
  }
}

router.protected = protected;

module.exports = router;
