const User = require('../../models/user');
var Errormsg = require('../../errmsg');

const register = async function(req, res, next){
    try {
        if (req.body.password != req.body.confirm) throw new Error('Passwords must match.');
        var user = new User({
            username: req.body.username,
            password: req.body.password,
        });
        await user.save();
        res.status(200).json({"message": "User registered."});
    } catch (error) {
        Errormsg(error, res);
    }
};
module.exports = register;