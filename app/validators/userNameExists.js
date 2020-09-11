const userNameExists = async function(value, args) {
    var User = require('../models/user');
    if (this.__v != undefined) {
        var typeCount = await User.findOne({_id:{'$ne': this._id}, user: new RegExp(`^${value}$`,'i')});
        if (typeCount != null) return false;
    } else {
        var typeCount = await User.findOne({username: new RegExp(`^${value}$`,'i')});
        if (typeCount != null) return false;
    }

};
module.exports = userNameExists;