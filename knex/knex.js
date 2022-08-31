require('dotenv').config();
const environment = process.env.ENVIRONMENT;
const config = require('../knexfile.js')[environment];
module.exports = require('knex')(config);