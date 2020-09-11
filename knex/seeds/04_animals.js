
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('animals').del()
    .then(function () {
      // Inserts seed entries
      return knex('animals').insert([
        {id: 1, name: 'animal1', description: 'description1'},
        {id: 2, name: 'animal2', description: 'description2'},
        {id: 3, name: 'animal3', description: 'description3'}
      ]);
    });
};
