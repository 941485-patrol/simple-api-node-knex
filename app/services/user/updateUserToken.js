const crypto = require('crypto');
const updateUserTokenRepo = require('../../repositories/user/updateUserToken');
const updateUserToken = function(user){
    var accessToken = crypto.randomBytes(64).toString('hex');
    var updatedToken = updateUserTokenRepo(user.id, accessToken);
    return updatedToken;
}
module.exports = updateUserToken;