const knex = require("knex");
const db = knex(require("../knexfile").development);

function getUsers() {
  return db("users");
}

function getUsersById(id) {
  return db("users")
    .where({ id })
    .first();
}

module.exports = {
  getUsers,
  getUsersById
};
