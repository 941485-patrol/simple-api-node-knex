const crypto = require('crypto');
const UserRepo = require('../../repositories/user');
const updateUserToken = function(req, usr){
    var user = new UserRepo(req);
    var accessToken = crypto.randomBytes(64).toString('hex');
    var updatedToken = user.updateUserToken(usr.id, accessToken)
    return updatedToken;
}
module.exports = updateUserToken;