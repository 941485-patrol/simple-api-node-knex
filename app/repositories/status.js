const knex = require('../../knex/knex.js');
class Status {
    constructor(req=null){
        this.req = req;
    }

    getStatus(column, value){
        return knex('status').select('*').whereRaw('??=?', [column, value]).first();
    }
}
module.exports = Status;