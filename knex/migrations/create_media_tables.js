exports.up = function(knex) {
  return (
    knex.schema
      .createTable("movies", function(table) {
        table.string("title", 255);
        table.string("director", 255);
        table.string("release", 255);
        table.string("genre", 255);
        table.string("watched", 1);
      })
      .then(() =>
        knex.schema.createTable("albums", function(table) {
          table.string("title", 255);
          table.string("artist", 255);
          table.string("released", 255);
          table.string("genre", 255);
          table.string("label", 255);
          table.string("listened", 1);
        })
      )
      .then(() =>
        knex.schema.createTable("books", function(table) {
          table.string("title", 255);
          table.string("author", 255);
          table.string("published", 255);
          table.string("genre", 255);
          table.string("read", 1);
        })
      )
  );
};

exports.down = function(knex) {
  return knex.schema
    .dropTable("movies")
    .then(() => knex.schema.dropTable("albums"))
    .then(() => knex.schema.dropTable("books"));
};

exports.config = { transaction: false };
