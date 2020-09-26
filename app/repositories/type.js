const { andWhereNotBetween } = require('../../knex/knex.js');
const knex = require('../../knex/knex.js');
class Type {
    constructor(req=null){
        this.req = req;
    }

    getAllTypes(searchee, perPage, pageSkip, sort){
        return knex('types')
        .select(knex.raw('*, COUNT(id) over()'))
        .where(searchee)
        .limit(perPage).offset(pageSkip*perPage)
        .orderBy(sort[0], sort[1])
    }

    getType(column, value){
        return knex('types').select('*').whereRaw('??=?', [column, value]).first();
    }

    createType(name, environment){
        return knex('types').returning('id').insert({name: name, environment: environment});
    }

    updateType(id, name, environment){
        return knex('types').returning('id').where({'id': id}).update({name: name, environment: environment, updated_at: knex.raw('NOW()')});
    }

    deleteType(id){
        return knex('types').where({'id': id}).del();
    }

    checkTypeName(searchee){
        return knex('types').select('types.name').where(searchee).first();
    }

    checkTypeEnv(searchee){
        return knex('types').select('types.environment').where(searchee).first();
    }

    getAnimalIds(id){
        return knex('animals').select('*').where({'id': id}).first();
    }
}
module.exports = Type;