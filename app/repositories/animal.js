const knex = require('../../knex/knex.js');
class Animal {
    constructor(req=null){
        this.req = req;
    }

    getAllAnimals(searchee, perPage, page, pageSkip, sort){
        return knex('animals')
        .select(knex.raw('animals.*, COUNT(animals.id) over(), status.name AS statName, status.description AS statDesc, types.name AS typeName, types.environment AS typeEnv'))
        .leftJoin('status', 'animals.status_id', 'status.id')
        .leftJoin('types', 'animals.type_id', 'types.id')
        .where(searchee)
        .limit(perPage).offset(pageSkip*perPage)
        .orderBy(sort[0], sort[1]);
    }
}
module.exports = Animal;