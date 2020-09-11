const Animal = require('../../models/animal');
const Type = require('../../models/type');
const Errormsg = require('../../errmsg');
const mongoose = require('mongoose');

const updateType = async (req, res, next) => {
    try {
        if( mongoose.isValidObjectId(req.params.id) === false ) throw new Error('Invalid Url.');
        var type = await Type.findOne({_id:req.params.id});
        if ( type === null ) throw new Error('Cannot find type.');
        type.name = req.body.name;
        type.environment = req.body.environment;
        type.updated_at = Date.now();
        await type.save();
        res.redirect(301, req.originalUrl);
    } catch (error) {
        Errormsg(error, res);
    }
}
module.exports = updateType;