const bcrypt = require("bcryptjs"); 
const validateUser = function( formPassword, dbPassword){
    var validUser = bcrypt.compareSync(formPassword, dbPassword);
    if (validUser == false) {
        throw new Error('Wrong credentials.');
    } else {
        return true;
    }
}
module.exports = validateUser;