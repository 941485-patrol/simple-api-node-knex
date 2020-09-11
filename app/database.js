const pg = require('knex')({
  client: 'pg',
  connection: process.env.DEV_POSTGRES_URI,
});

module.exports = pg;

