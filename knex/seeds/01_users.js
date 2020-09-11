
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'username', password: 'Password1234', token:'abcdefg01234567'},
      ]);
    });
};
