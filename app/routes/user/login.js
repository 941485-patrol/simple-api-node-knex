var Errormsg = require('../../errmsg');
const getUserService = require('../../services/user/getUser');
const updateUserToken = require('../../services/user/updateUserToken');
const validateUser = require('../../validators/validateUser');

const login = async function(req, res, next){
    try {
        var user = await getUserService(req);
        var validUser = await validateUser(req, user);
        var token = await updateUserToken(req, validUser);
        console.log(token);
        res.cookie('session', token[0].token, {
            signed:true,
            sameSite:'none',
            httpOnly:true,
            maxAge:180000, // 3 minutes
        });
        res.status(200).json({"message": "You are now logged in."});
    } catch (error) {
        Errormsg(error, res);
    }
}
module.exports = login;