const Animal = require('../../models/animal');
const Type = require('../../models/type');
const Status = require('../../models/status');
const mongoose = require('mongoose');
const deleteAnimal = async (req, res, next)=>{
  try {
    if( mongoose.isValidObjectId(req.params.id) === false ) throw new Error('Invalid Url.');
    var delAnimal = await Animal.deleteOne({_id:req.params.id});
    if ( delAnimal.deletedCount != 1 ) throw new Error('Error deleting data.');
    var type = await Type.findOne({animal_ids: req.params.id});
    if ( type != null ) {
      type.animal_ids.pull(req.params.id);
      await type.save({validateBeforeSave: false});
    }
    var status = await Status.findOne({animal_ids: req.params.id});
    if ( status != null ) {
      status.animal_ids.pull(req.params.id);
      await status.save({validateBeforeSave: false});
    }
    res.status(200).json({'message': 'Animal deleted.'});
  } catch (error) {
    res.status(400).json([error.message])
  }
}
module.exports = deleteAnimal;