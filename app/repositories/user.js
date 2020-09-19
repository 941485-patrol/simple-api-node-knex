const knex = require('../../knex/knex.js');
class User {
    constructor(req = null){
        this.req = req;
    }

    getUser(ilike=false, username){
        if (ilike=true) {
            return knex('users').select('*').where('username', 'ilike', username).first();
        } else {
            return knex('users').select('*').where('username', '=', username).first();
        }
    }

    setUser(username ,hash){
        return knex('users').insert({username: username, password: hash},['id']);
    }

    getToken(token) {
        return knex('users').select('id').where({token: token}).first();
    }

    updateUserToken(userId, accessToken) {
        return knex('users').where('id', '=', userId).update({token: accessToken}, ['token']);
    }
}
module.exports = User;