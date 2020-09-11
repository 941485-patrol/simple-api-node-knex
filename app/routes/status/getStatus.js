const Status = require('../../models/status');
const Errmsg = require('../../errmsg');
const mongoose = require('mongoose');
const serializeStatus = require('./serializeStatus');
const getStatus = async function (req, res, next) {
    try {
        if (mongoose.isValidObjectId(req.params.id) === false) throw new Error('Invalid Url.');
        var status = await Status.findOne({_id: req.params.id}).populate('animal_ids');
        if (status === null) throw new Error('Cannot find status.');
        var statusObj = serializeStatus(status);
        res.status(200).json(statusObj);
    } catch (error) {
        Errmsg(error, res);
    }
}
module.exports = getStatus;