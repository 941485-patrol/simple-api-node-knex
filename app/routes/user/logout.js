const knex = require("../../../knex/knex.js");
const logout = async function(req, res, next){
    await knex('users').where('token', '=', req.signedCookies['session']).update({token: ''});
    res.clearCookie('session');
    res.status(200).json({"message":"You are now logged out."});
}
module.exports = logout;