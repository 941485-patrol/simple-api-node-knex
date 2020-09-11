const logout = async function(req, res, next){
    res.clearCookie('session');
    res.status(200).json({"message":"You are now logged out."});
}
module.exports = logout;