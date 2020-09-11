
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('status').del()
    .then(function () {
      // Inserts seed entries
      return knex('status').insert([
        {id: 1, name: 'status1', description: 'description1'},
        {id: 2, name: 'status2', description: 'description2'},
        {id: 3, name: 'status3', description: 'description3'}
      ]);
    });
};
