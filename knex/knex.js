const knex = require('knex');
const connection = require('../knexfile.js')['development'];
const db = require('knex')(connection)

module.exports = { knex, db };