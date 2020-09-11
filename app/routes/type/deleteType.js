const Animal = require('../../models/animal');
const Type = require('../../models/type');
const mongoose = require('mongoose');

const deleteType = async (req, res, next)=>{
  try {
    if( mongoose.isValidObjectId(req.params.id) === false ) throw new Error('Invalid Url.');
    var deleteType = await Type.deleteOne({_id:req.params.id});
    if (deleteType.deletedCount != 1) throw new Error('Error deleting data.');
    var animals = await Animal.find({type_id: req.params.id});
    if ( animals != null) {
      animals.forEach(async animal => {
        animal.type_id = null;
        await animal.save({validateBeforeSave: false});
      });
    }
    res.status(200).json({'message': 'Type deleted.'});
  } catch (error) {
    res.status(400).json([error.message])
  }
}
module.exports = deleteType;