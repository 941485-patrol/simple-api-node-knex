const knex = require('../../../knex/knex.js');
const updateUserToken = function(userId, accessToken) {
    return knex('users').where('id', '=', userId).update({token: accessToken}, ['token']);
}
module.exports = updateUserToken;