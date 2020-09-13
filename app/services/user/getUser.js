const UserRepo = require('../../repositories/user');
const getUser = function(username){
    var user = new UserRepo();
    return user.getUser(username);
}
module.exports = getUser;