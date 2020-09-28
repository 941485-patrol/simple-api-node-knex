const knex = require('../../knex/knex.js');
class Status {
    constructor(req=null){
        this.req = req;
    }

    getAll(){
        return knex('status').select('*').orderBy('status.id','desc');
    }

    getAllStatus(searchee, perPage, pageSkip, sort){
        return knex('status')
        .select(knex.raw('*, COUNT(id) over()'))
        .where(searchee)
        .limit(perPage).offset(pageSkip*perPage)
        .orderBy(sort[0], sort[1])
    }

    getStatus(column, value){
        return knex('status').select('*').whereRaw('??=?', [column, value]).first();
    }

    createStatus(name, description){
        return knex('status').returning('id').insert({name: name, description: description});
    }

    updateStatus(id, name, description){
        return knex('status').returning('id').where({'id': id}).update({name: name, description: description, updated_at: knex.raw('NOW()')});
    }

    deleteStatus(id){
        return knex('status').where({'id': id}).del();
    }

    checkStatusName(searchee){
        return knex('status').select('status.name').where(searchee).first();
    }

    checkStatusDesc(searchee){
        return knex('status').select('status.description').where(searchee).first();
    }

    getAnimalIds(id){
        return knex('animals').select('*').where({'id': id}).first();
    }
}
module.exports = Status;