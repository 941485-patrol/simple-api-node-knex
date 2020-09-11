
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('types').del()
    .then(function () {
      // Inserts seed entries
      return knex('types').insert([
        {id: 1, name: 'type1', environment: 'environment1'},
        {id: 2, name: 'type2', environment: 'environment2'},
        {id: 3, name: 'type3', environment: 'environment3'}
      ]);
    });
};
