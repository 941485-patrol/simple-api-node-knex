exports.seed =  async function(knex) {
  await knex('status').where('id', 1).update({animal_ids: knex.raw('array_append(animal_ids,?)',[1])});
  await knex('status').where('id', 1).update({animal_ids: knex.raw('array_append(animal_ids,?)',[12])});
  await knex('status').where('id', 3).update({animal_ids: knex.raw('array_append(animal_ids,?)',[2])});
  await knex('status').where('id', 3).update({animal_ids: knex.raw('array_append(animal_ids,?)',[11])});
  await knex('status').where('id', 5).update({animal_ids: knex.raw('array_append(animal_ids,?)',[3])});
  await knex('status').where('id', 5).update({animal_ids: knex.raw('array_append(animal_ids,?)',[10])});
  await knex('status').where('id', 7).update({animal_ids: knex.raw('array_append(animal_ids,?)',[4])});
  await knex('status').where('id', 7).update({animal_ids: knex.raw('array_append(animal_ids,?)',[9])});
  await knex('status').where('id', 9).update({animal_ids: knex.raw('array_append(animal_ids,?)',[5])});
  await knex('status').where('id', 9).update({animal_ids: knex.raw('array_append(animal_ids,?)',[8])});
  await knex('status').where('id', 11).update({animal_ids: knex.raw('array_append(animal_ids,?)',[6])});
  await knex('status').where('id', 11).update({animal_ids: knex.raw('array_append(animal_ids,?)',[7])});
};