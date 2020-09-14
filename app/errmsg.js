const errmsg = (err,res)=> {
    var errArr = err.message.split('. ');
    errArr = errArr.map(e=>{
        if (e.includes('.')==true){
            return e;
        } else {
            return `${e}.`;
        }
    });
    res.status(400).json(errArr);
}
module.exports = errmsg;