var Errormsg = require('../../errmsg');
const getUserService = require('../../services/user/getUser');
const updateUserToken = require('../../services/user/updateUserToken');
const validateUser = require('../../services/user/validateUser');
const bcrypt = require('bcryptjs');

const login = async function(req, res, next){
    try {
        var user = await getUserService(ilike=false, req.body.username);
        if (user == null) throw new Error('Wrong credentials');
        var validUser = validateUser(req.body.password, user.password);
        if (validUser == true) {
            var token = await updateUserToken(user.id);
            if (process.env.NODE_ENV == 'production') {
                res.cookie('session', token[0].token, {
                    signed:true,
                    sameSite:'none',
                    secure:true,
                    httpOnly:true,
                    maxAge:180000, // 3 minutes
                });
            } 
            if (process.env.NODE_ENV == 'development') {
                res.cookie('session', token[0].token, {
                    signed:true,
                    sameSite:'none',
                    secure:true,
                    httpOnly:true,
                    maxAge:180000, // 3 minutes
                });
            }
            if (process.env.NODE_ENV == 'testing') {
                res.cookie('session', token[0].token, {
                    signed:true,
                    sameSite:'none',
                    httpOnly:true,
                    maxAge:180000, // 3 minutes
                });
            }
            res.status(200).json({"message": "You are now logged in."});
        }
    } catch (error) {
        Errormsg(error, res);
    }
}
module.exports = login;