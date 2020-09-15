const RegisterForm = require('../../validators/registerSchema');
var Errormsg = require('../../errmsg');
const setUserService = require('../../services/user/setUser');
const getUserService = require('../../services/user/getUser');
const register = async function(req, res, next){
    try {
        var userExists = await getUserService(req.body.username);
        if (userExists != null) throw new Error('Username already exists');
        var user = await RegisterForm
            .validateAsync({
                username: req.body.username, 
                password: req.body.password, 
                repeat_password: req.body.repeat_password
            }, options={abortEarly: false});
        await setUserService(user.username, user.password);
        res.status(200).json({"message": "User registered."});
    } catch (error) {
        Errormsg(error, res);
    }
};
module.exports = register;