const knex = require('../../../knex/knex.js');
const getAllAnimals = function(searchee, perPage, page, pageSkip, sort){
    try {
        return knex('animals')
        .select('animals.*', 'status.name AS statName', 'status.description AS statDesc', 'types.name AS typeName', 'types.environment AS typeEnv')
        .leftJoin('status', 'animals.status_id', 'status.id')
        .leftJoin('types', 'animals.type_id', 'types.id')
        .where(searchee)
        .limit(perPage).offset(pageSkip*perPage)
        .orderBy(sort[0], sort[1]);
    } catch (error) {
        console.log(error.message)
    }
}
module.exports = getAllAnimals;