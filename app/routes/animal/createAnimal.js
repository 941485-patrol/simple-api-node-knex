const Errormsg = require('../../errmsg');
const createAnimalService = require('../../services/animal/createAnimal');
const validateAnimalService = require('../../services/animal/validateAnimal');
const checkAnimalName = require('../../services/animal/checkAnimalName');
const checkAnimalDesc = require('../../services/animal/checkAnimalDesc');
const getStatusService = require('../../services/status/getStatus');
const getTypeService = require('../../services/type/getType');
const pushIdtoStatus = require('../../services/animal/pushIdtoStatus');
const pushIdtoType = require('../../services/animal/pushIdtoType');
const createAnimal = async (req, res, next ) => {
  try {
    var fieldsArr = [];
    var idsArr = [];
    var animal = await validateAnimalService(req);
    var status = await getStatusService('id', animal.status_id);
    if (status == null) idsArr.push('Status ID does not exist.');
    var type = await getTypeService('id', animal.type_id);
    if (type == null) idsArr.push('Type ID does not exist.');
    if (idsArr.length != 0) {
      var idsStr = idsArr.join(' ');
      throw new Error(idsStr);
    }
    var nameExists = await checkAnimalName('add', animal.name, null);
    if (nameExists != null) fieldsArr.push('Name already exists.');
    var descExists = await checkAnimalDesc('add', animal.description, null);
    if (descExists != null) fieldsArr.push('Description already exists.');
    if (fieldsArr.length != 0) {
      var errStr = fieldsArr.join(' ');
      throw new Error(errStr);
    }
    var create = await createAnimalService(animal.name, animal.description, animal.status_id, animal.type_id);
    if (create.length == 0) throw new Error('Error creating animal.');
    var status = await pushIdtoStatus(create[0], animal.status_id);
    if (status.length == 0 ) throw new Error('Error pushing status.');
    var type = await pushIdtoType(create[0], animal.type_id);
    if (type.length == 0) throw new Error('Error pushing type.');
    res.status(200).json({"message": "Animal created"});
  } catch (error) {
    Errormsg(error, res);
  }
}
module.exports = createAnimal;