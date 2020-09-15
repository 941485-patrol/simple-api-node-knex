const UserRepo = require('../../repositories/user');
const getUser = function(ilike, username){
    var user = new UserRepo();
    return user.getUser(ilike, username);
}
module.exports = getUser;