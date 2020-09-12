const bcrypt = require("bcryptjs"); 
const validateUser = function(req, user){
    if (user.length == 0) throw new Error('Wrong credentials.');
    var validUser = bcrypt.compareSync(req.body.password, user[0].password);
    if (validUser == false) {
        throw new Error('Wrong credentials.');
    } else {
        return user;
    }
}
module.exports = validateUser;