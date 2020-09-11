exports.seed =  async function(knex) {
  await knex('types').where('id', 2).update({animal_ids: knex.raw('array_append(animal_ids,?)',[1])});
  await knex('types').where('id', 2).update({animal_ids: knex.raw('array_append(animal_ids,?)',[12])});
  await knex('types').where('id', 4).update({animal_ids: knex.raw('array_append(animal_ids,?)',[2])});
  await knex('types').where('id', 4).update({animal_ids: knex.raw('array_append(animal_ids,?)',[11])});
  await knex('types').where('id', 6).update({animal_ids: knex.raw('array_append(animal_ids,?)',[3])});
  await knex('types').where('id', 6).update({animal_ids: knex.raw('array_append(animal_ids,?)',[10])});
  await knex('types').where('id', 8).update({animal_ids: knex.raw('array_append(animal_ids,?)',[4])});
  await knex('types').where('id', 8).update({animal_ids: knex.raw('array_append(animal_ids,?)',[9])});
  await knex('types').where('id', 10).update({animal_ids: knex.raw('array_append(animal_ids,?)',[5])});
  await knex('types').where('id', 10).update({animal_ids: knex.raw('array_append(animal_ids,?)',[8])});
  await knex('types').where('id', 12).update({animal_ids: knex.raw('array_append(animal_ids,?)',[6])});
  await knex('types').where('id', 12).update({animal_ids: knex.raw('array_append(animal_ids,?)',[7])});
};