const knex = require("knex");
const db = knex(require("../knexfile").development);

function getUsers() {
  return db("users").select("id", "username", "password");
}

function getUsersById(id) {
  return db("users")
    .where({ id })
    .first();
}

function getBy(filter) {
  return db("users").where(filter);
}

function add(user) {
  return db("users")
    .insert(user, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

module.exports = {
  getUsers,
  getUsersById,
  getBy,
  add
};
