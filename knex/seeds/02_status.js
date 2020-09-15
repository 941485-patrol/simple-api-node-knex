
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE TABLE status restart identity CASCADE')
    .then(function () {
      // Inserts seed entries
      return knex('status').insert([
        {name: 'status1', description: 'description1'},
        {name: 'status2', description: 'description2'},
        {name: 'status3', description: 'description3'},
        {name: 'status4', description: 'description4'},
        {name: 'status5', description: 'description5'},
        {name: 'status6', description: 'description6'},
        {name: 'status7', description: 'description7'},
        {name: 'status8', description: 'description8'},
        {name: 'status9', description: 'description9'},
        {name: 'status10', description: 'description10'},
        {name: 'status11', description: 'description11'},
        {name: 'status12', description: 'description12'},
      ]);
    });
};
