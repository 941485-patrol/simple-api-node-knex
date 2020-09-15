const bcrypt = require('bcryptjs');
const crypto = require('crypto');
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE TABLE users restart identity')
    .then(function () {
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync('Password1234', salt);
      var accessToken = crypto.randomBytes(64).toString('hex');
      // Inserts seed entries
      return knex('users').insert([
        {username: 'username', password: hash},
      ]);
    });
};
