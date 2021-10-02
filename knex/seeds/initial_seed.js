const { albums, books, movies } = require('../../src/data');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("movies")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("movies").insert(movies);
    })
    .then(function() {
      // Inserts seed entries
      return knex("albums").insert(albums);
    })
    .then(function() {
      // Inserts seed entries
      return knex("books").insert(books);
    });
};
