const bcrypt = require('bcryptjs');
const UserRepo = require('../../repositories/user');
const setUser = function(username){
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync('Password1234', salt);
    var user = new UserRepo();
    return user.setUser(username, hash);
}
module.exports = setUser;