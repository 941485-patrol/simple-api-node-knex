
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('status').del()
    .then(function () {
      // Inserts seed entries
      return knex('status').insert([
        {id: 1, name: 'status1', description: 'description1'},
        {id: 2, name: 'status2', description: 'description2'},
        {id: 3, name: 'status3', description: 'description3'},
        {id: 4, name: 'status4', description: 'description4'},
        {id: 5, name: 'status5', description: 'description5'},
        {id: 6, name: 'status6', description: 'description6'},
        {id: 7, name: 'status7', description: 'description7'},
        {id: 8, name: 'status8', description: 'description8'},
        {id: 9, name: 'status9', description: 'description9'},
        {id: 10, name: 'status10', description: 'description10'},
        {id: 11, name: 'status11', description: 'description11'},
        {id: 12, name: 'status12', description: 'description12'},
      ]);
    });
};
