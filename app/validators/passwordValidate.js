const passwordValidate = function(value, helpers){
    var hasDigits = /[0-9]/.test(value);
    var hasCaps = /[A-Z]/.test(value);
    if (hasDigits == true && hasCaps == true) {
        return value
    } else {
        return helpers.message('Password must have a capital letter and a number.')
    }
};
module.exports = passwordValidate;