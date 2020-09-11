const Status = require('../../models/status');
const Animal = require('../../models/animal');
const Errmsg = require('../../errmsg');
const mongoose = require('mongoose');
const deleteStatus = async function (req, res, next) {
    try {
        if( mongoose.isValidObjectId(req.params.id) === false ) throw new Error('Invalid Url.');
        var deleteStatus = await Status.deleteOne({_id: req.params.id});
        if ( deleteStatus.deletedCount != 1) throw new Error('Error deleting data.');
        var animals = await Animal.find({status_id: req.params.id});
        if ( animals != null) {
          animals.forEach(async animal => {
            animal.status_id = null;
            await animal.save({validateBeforeSave: false});
          });
        }
        res.status(200).json({'message': 'Status deleted.'})
    } catch (error) {
        Errmsg(error, res);
    }
}
module.exports = deleteStatus;