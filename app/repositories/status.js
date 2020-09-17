const knex = require('../../knex/knex.js');
class Status {
    constructor(req=null){
        this.req = req;
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

    getAnimalIds(id){
        return knex('animals').select('*').where('status_id','=', id);
    }
}
module.exports = Status;