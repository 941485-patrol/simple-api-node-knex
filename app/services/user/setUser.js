const bcrypt = require('bcryptjs');
const UserRepo = require('../../repositories/user');
const setUser = function(usr){
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync('Password1234', salt);
    var user = new UserRepo(usr);
    return user.setUser(hash);
}
module.exports = setUser;