const { select } = require('../../knex/knex.js');
const knex = require('../../knex/knex.js');
class Type {
    constructor(req=null){
        this.req = req;
    }

    getType(column, value){
        return knex('types').select('*').whereRaw('??=?', [column, value]).first();
    }
}
module.exports = Type;