const bcrypt = require("bcryptjs"); 
const validateUser = function(req, user){
    if (user == null) throw new Error('Wrong credentials.');
    var validUser = bcrypt.compareSync(req.body.password, user.password);
    if (validUser == false) {
        throw new Error('Wrong credentials.');
    } else {
        return user;
    }
}
module.exports = validateUser;