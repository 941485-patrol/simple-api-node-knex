const Status = require('../../models/status');
const Errmsg = require('../../errmsg');
const mongoose = require('mongoose');
const updateStatus = async function (req, res, next) {
    try {
        if( mongoose.isValidObjectId(req.params.id) === false ) throw new Error('Invalid Url.');
        var status = await Status.findOne({_id:req.params.id});
        if ( status === null ) throw new Error('Cannot find status.');
        status.name = req.body.name;
        status.description = req.body.description;
        status.updated_at = Date.now();
        await status.save();
        res.redirect(301, req.originalUrl);
    } catch (error) {
        Errmsg(error, res);
    }
}
module.exports = updateStatus;