const crypto = require('crypto');
const UserRepo = require('../../repositories/user');
const updateUserToken = function(usrId){
    var user = new UserRepo();
    var accessToken = crypto.randomBytes(64).toString('hex');
    var updatedToken = user.updateUserToken(usrId, accessToken)
    return updatedToken;
}
module.exports = updateUserToken;