const Errormsg = require('../../errmsg');
const validateUrl = require('../../services/url/validateUrl');
const validateAnimalService = require('../../services/animal/validateAnimal');
const getOneAnimal = require('../../services/animal/getOneAnimal');
const getTypeService = require('../../services/type/getType');
const getStatusService = require('../../services/status/getStatus');
const checkAnimalName = require('../../services/animal/checkAnimalName');
const checkAnimalDesc = require('../../services/animal/checkAnimalDesc');
const updateAnimalService = require('../../services/animal/updateAnimal');
const pullStatus = require('../../services/animal/pullStatus');
const pullType = require('../../services/animal/pullType');
const pushStatus = require('../../services/animal/pushIdtoStatus');
const pushType = require('../../services/animal/pushIdtoType');
const updateAnimal = async (req, res, next) => {
  try {
    var idsArr = [];
    var fieldsArr = [];
    var validUrl = await validateUrl(req.params.id);
    var oldAnimal = await getOneAnimal(validUrl.url);
    if (oldAnimal == null) throw new Error('Cannot find animal.');
    var newAnimal = await validateAnimalService(req);
    var status = await getStatusService('id', newAnimal.status_id);
    if (status == null) idsArr.push('Status ID does not exist.');
    var type = await getTypeService('id', newAnimal.type_id);
    if (type == null) idsArr.push('Type ID does not exist.');
    if (idsArr.length != 0) {
      var idsStr = idsArr.join(' ');
      throw new Error(idsStr);
    }
    var nameExists = await checkAnimalName('edit', newAnimal.name, oldAnimal.id);
    if (nameExists != null) fieldsArr.push('Name already exists.');
    var descExists = await checkAnimalDesc('edit', newAnimal.description, oldAnimal.id);
    if (descExists != null) fieldsArr.push('Description already exists.');
    if (fieldsArr.length != 0) {
      var errStr = fieldsArr.join(' ');
      throw new Error(errStr);
    }
    var updated = await updateAnimalService(oldAnimal.id, newAnimal.name, newAnimal.description, newAnimal.status_id, newAnimal.type_id);
    if (updated.length == 0) throw new Error('Error updating animal.');
    await pullStatus(oldAnimal.id);
    await pullType(oldAnimal.id);
    var newStatus = await pushStatus(oldAnimal.id, newAnimal.status_id);
    if (newStatus.length == 0) throw new Error('Error pushing status.');
    var newType = await pushType(oldAnimal.id, newAnimal.type_id);
    if (newType.length == 0) throw new Error('Error pushing type.');
    res.status(200).json({'message': 'Animal Updated.', '_this': req.originalUrl})
  } catch (error) {
    Errormsg(error, res);
  } 
}
module.exports = updateAnimal;