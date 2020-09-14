const errmsg = (err,res)=> {
    var errArr = err.message.split('. ');
    res.status(400).json(errArr);
}
module.exports = errmsg;