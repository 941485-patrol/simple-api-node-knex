const User = require('../../models/user');
var Errormsg = require('../../errmsg');
var crypto = require('crypto');
const bcrypt = require("bcryptjs"); 

const login = async function(req, res, next){
    try {
        var user = await User.findOne({username:req.body.username});
        if (user == null) throw new Error('Wrong credentials.');
        var validUser = bcrypt.compareSync(req.body.password, user.password);
        if (validUser == false) throw new Error('Wrong credentials.');
        var accessToken = crypto.randomBytes(64).toString('hex');
        user.token = accessToken;
        await user.save({validateBeforeSave: false});
        res.cookie('session', user.token, {
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