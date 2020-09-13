const RegisterForm = require('../../validators/registerSchema');
var Errormsg = require('../../errmsg');
const knex = require('../../../knex/knex.js');
const setUserService = require('../../services/user/setUser');
const register = async function(req, res, next){
    try {
        var user = await RegisterForm
            .validateAsync({
                username: req.body.username, 
                password: req.body.password, 
                repeat_password: req.body.repeat_password
            }, options={abortEarly: false});
        await setUserService(user.username);
        res.status(200).json({"message": "User registered."});
    } catch (error) {
        Errormsg(error, res);
    }
};
module.exports = register;