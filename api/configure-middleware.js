const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
// const cookieParser = require("cookie-parser");
const session = require("express-session");

module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(cookieParser()); // 'cookie-parser'
  server.use(cors());
  server.use(
    session({
      name: "notsession",
      secret: "nobody tosses a dwarf!",
      cookie: {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        secure: true
      },
      httpOnly: true,
      resave: true,
      saveUninitialized: false
    })
  );
};
