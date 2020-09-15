
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE TABLE types restart identity CASCADE')
    .then(function () {
      // Inserts seed entries
      return knex('types').insert([
        {name: 'type1', environment: 'environment1'},
        {name: 'type2', environment: 'environment2'},
        {name: 'type3', environment: 'environment3'},
        {name: 'type4', environment: 'environment4'},
        {name: 'type5', environment: 'environment5'},
        {name: 'type6', environment: 'environment6'},
        {name: 'type7', environment: 'environment7'},
        {name: 'type8', environment: 'environment8'},
        {name: 'type9', environment: 'environment9'},
        {name: 'type10', environment: 'environment10'},
        {name: 'type11', environment: 'environment11'},
        {name: 'type12', environment: 'environment12'},
      ]);
    });
};
