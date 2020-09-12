const knex = require('../../knex/knex.js');
class User {
    constructor(req = null){
        this.req = req;
    }

    getUser(){
        return knex('users').select('*').where('username', '=', this.req.body.username).first();
    }

    setUser(hash, token){
        return knex('users').insert({username: this.req.username, password: hash},['id']);
    }

    updateUserToken(userId, accessToken) {
        return knex('users').where('id', '=', userId).update({token: accessToken}, ['token']);
    }
}
module.exports = User;