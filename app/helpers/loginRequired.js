const UserRepo = require('../repositories/user');
const loginRequired = async function(req,res,next){
    if (req.signedCookies['session'] === undefined) {
        res.status(401).json({'message':'Unauthorized.'})
    } else {
        var accessToken = req.signedCookies['session'];
        var user = new UserRepo();
        var validToken = await user.getToken(accessToken);
        if (validToken == null) {
            res.status(401).json({'message':'Unauthorized.'});
        } else {
            next();
        }
    }
};
module.exports = loginRequired;
