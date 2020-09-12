const bcrypt = require('bcryptjs');
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync('Password1234', salt);
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'username', password: hash},
      ]);
    });
};
