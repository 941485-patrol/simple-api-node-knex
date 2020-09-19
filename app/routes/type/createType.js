const Errmsg = require('../../errmsg');
const createTypeService = require('../../services/type/createType');
const validateTypeService = require('../../services/type/validateType');
const checkTypeName = require('../../services/type/checkTypeName');
const checkTypeEnv = require('../../services/type/checkTypeEnv');
const createType = async (req, res, next ) => {
  try {
    var fieldsArr = [];
    var type = await validateTypeService(req);
    var nameExists = await checkTypeName('add', type.name, null);
    if (nameExists != null) fieldsArr.push('Name already exists.');
    var envExists = await checkTypeEnv('add', type.environment, null);
    if (envExists != null) fieldsArr.push('Environment already exists.');
    if (fieldsArr.length != 0) {
      var errStr = fieldsArr.join(' ');
      throw new Error(errStr);
    }
    var create = await createTypeService(type.name, type.environment);
    if (create == 0) throw new Error('Error creating type.');
    res.status(200).json({"message": "Type created"});
  } catch (error) {
    Errmsg(error, res);
  }
}
module.exports = createType;