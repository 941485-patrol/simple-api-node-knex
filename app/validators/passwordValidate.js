const passwordValidate = async function(value, args) {
    var password = value;
    var hasDigits = /[0-9]/.test(password); // change this to test;
    var hasCaps = /[A-Z]/.test(password);
    if (hasDigits === true && hasCaps === true) {
        return true;
    } else {
        return false;
    }
};
module.exports = passwordValidate;