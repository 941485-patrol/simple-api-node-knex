const Type = require('../../models/type');
const Errormsg = require('../../errmsg');
const serializeType = require('./serializeType');
const mongoose = require('mongoose');
const getType = async (req, res, next)=>{
  try {
    if( mongoose.isValidObjectId(req.params.id) === false ) throw new Error('Invalid Url.');
    var type = await Type.findOne({_id : req.params.id}).populate('animal_ids');
    if (type==null) throw new Error("Cannot find type.");
    var typeObj = serializeType(type);
    res.status(200).json(typeObj);
  } catch (error) {
    Errormsg(error, res);
  }
}
module.exports = getType;