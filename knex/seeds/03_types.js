
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('types').del()
    .then(function () {
      // Inserts seed entries
      return knex('types').insert([
        {id: 1, name: 'type1', environment: 'environment1'},
        {id: 2, name: 'type2', environment: 'environment2'},
        {id: 3, name: 'type3', environment: 'environment3'},
        {id: 4, name: 'type4', environment: 'environment4'},
        {id: 5, name: 'type5', environment: 'environment5'},
        {id: 6, name: 'type6', environment: 'environment6'},
        {id: 7, name: 'type7', environment: 'environment7'},
        {id: 8, name: 'type8', environment: 'environment8'},
        {id: 9, name: 'type9', environment: 'environment9'},
        {id: 10, name: 'type10', environment: 'environment10'},
        {id: 11, name: 'type11', environment: 'environment11'},
        {id: 12, name: 'type12', environment: 'environment12'},
      ]);
    });
};
