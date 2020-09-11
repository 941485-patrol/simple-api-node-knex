const errmsg = (err,res)=> {
    var errArr = [];
    errArr.push(err.message)
    res.status(400).json(errArr);
}
module.exports = errmsg;