const knex = require("../../../knex/knex.js");
const logout = async function(req, res, next){
    try {
        await knex('users').where('token', '=', req.signedCookies['session']).update({token: null});
        res.clearCookie('session');
        res.status(200).json({"message":"You are now logged out."});
    } catch (error) {
        console.log(error);
    }
   
}
module.exports = logout;