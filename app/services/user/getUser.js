const bcrypt = require("bcryptjs"); 
const knex = require('../../../knex/knex.js');
const getUserRepo = require('../../repositories/user/getUser');
const getUser = async function(req){
    try {
        var user = await getUserRepo(req);
        console.log(user);
        if (user == null) throw new Error('Wrong credentials.');
        var validUser = bcrypt.compareSync(req.body.password, user[0].password);
        if (validUser == false) {
            throw new Error('Wrong credentials.')
        } else {
            return user;
        };
    } catch (error) {
        
    }
}
module.exports = getUser;