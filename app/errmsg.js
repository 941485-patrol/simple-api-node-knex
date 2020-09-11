const errmsg = (err,res)=> {
    var errArr = [];
    if (err.errors === undefined) {
        if (err.path == 'type_id') {
            errArr.push('Wrong type id');
        } else if (err.path == '_id') {
            errArr.push('Wrong id');
        } else if (err.path == 'animals_id') {
            errArr.push('Wrong animal id');
        } else {
            errArr.push(err.message)
        }
    }
    else {
        for (const[key,value] of Object.entries(err.errors)) {
            if (value.properties === undefined){
                if (value.path == 'type_id') {
                    errArr.push('Wrong type id');
                } else if (value.path == '_id') {
                    errArr.push('Wrong id');
                } else if (value.path == 'animals_id') {
                    errArr.push('Wrong animal id');
                }
            } else {
                errArr.push(value.properties.message);
            }
        }
    }
    res.status(400).json(errArr);
}
module.exports = errmsg;