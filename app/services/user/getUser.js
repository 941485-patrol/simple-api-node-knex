const UserRepo = require('../../repositories/user');
const getUser = function(req){
    var user = new UserRepo(req);
    return user.getUser();
}
module.exports = getUser;