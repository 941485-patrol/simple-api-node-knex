const loginRequired = function(req,res,next){
    if (req.signedCookies['session'] === undefined) {
        res.status(401).json({'message':'Unauthorized.'})
    } else {
        next();
    }
};
module.exports = loginRequired;
