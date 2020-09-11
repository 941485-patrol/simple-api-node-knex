const statusNameExists = async function(value) {
    const Status = require("../models/status");
    if (this.__v != undefined) {
        var status = await Status
            .findOne()
            .where('_id').ne(this._id)
            .where('name').equals(new RegExp(`^${value}$`,'i'));
        if (status != null) return false;
    } else {
        var status = await Status
            .findOne()
            .where('name').equals(new RegExp(`^${value}$`,'i'));
        if (status != null) return false;
    }
}
module.exports = statusNameExists