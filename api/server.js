const express = require("express");
const bcrypt = require("bcrypt");

const credentials = req.body;

const hash = bcrypt.hashSync(credentials.password, 14);

credentials.password = hash;

const credentials = req.body;

if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
  return res.status(401).json({ error: "Incorrect credentials" });
}

const apiRouter = require("./api-router.js");
const configureMiddleware = require("./configure-middleware.js");

const server = express();

configureMiddleware(server);

server.use("/api/users", apiRouter);

module.exports = server;
