
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('animals').del()
    .then(function () {
      // Inserts seed entries
      return knex('animals').insert([
        {id: 1, name: 'animal1', description: 'description1', status_id:1, type_id:2},
        {id: 2, name: 'animal2', description: 'description2', status_id:3, type_id:4},
        {id: 3, name: 'animal3', description: 'description3', status_id:5, type_id:6},
        {id: 4, name: 'animal4', description: 'description4', status_id:7, type_id:8},
        {id: 5, name: 'animal5', description: 'description5', status_id:9, type_id:10},
        {id: 6, name: 'animal6', description: 'description6', status_id:11, type_id:12},
        {id: 7, name: 'animal7', description: 'description7', status_id:11, type_id:12},
        {id: 8, name: 'animal8', description: 'description8', status_id:9, type_id:10},
        {id: 9, name: 'animal9', description: 'description9', status_id:7, type_id:8},
        {id: 10, name: 'animal10', description: 'description10', status_id:5, type_id:6},
        {id: 11, name: 'animal11', description: 'description11', status_id:3, type_id:4},
        {id: 12, name: 'animal12', description: 'description12', status_id:1, type_id:2},
      ]);
    });
};
