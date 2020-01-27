exports.up = function(knex) {
  return knex.schema
    .createTable("users", table => {
      table.increments();
      table.string("name", 128).notNullable();
      table.integer("age").notNullable();
    })
    .createTable("followers", table => {
      table.increments();
      table.string("followers_name", 128).notNullable();
      table.string("followers_count", 128).notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users").dropTableIfExists("followers");
};
