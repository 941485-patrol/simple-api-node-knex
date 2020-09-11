const statusDescExists = async function(value) {
    const Status = require("../models/status");
    if (this.__v != undefined) {
        var status = await Status
            .findOne()
            .where('_id').ne(this._id)
            .where('description').equals(new RegExp(`^${value}$`,'gi'));
        if (status != null) return false;
    } else {
        var status = await Status
            .findOne()
            .where('description').equals(new RegExp(`^${value}$`,'gi'));
        if (status != null) return false;
    }
}
module.exports = statusDescExists;