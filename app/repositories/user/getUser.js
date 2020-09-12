const knex = require('../../../knex/knex.js');
const bcrypt = require("bcryptjs"); 
const getUser = function(req){  
    return knex('users').select('*').where('username', '=', req.body.username);
}
module.exports = getUser;