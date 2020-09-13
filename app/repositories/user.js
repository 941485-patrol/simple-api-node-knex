const knex = require('../../knex/knex.js');
class User {
    constructor(req = null){
        this.req = req;
    }

    getUser(username){
        return knex('users').select('*').where('username', '=', username).first();
    }

    setUser(username ,hash){
        return knex('users').insert({username: username, password: hash},['id']);
    }

    updateUserToken(userId, accessToken) {
        return knex('users').where('id', '=', userId).update({token: accessToken}, ['token']);
    }
}
module.exports = User;