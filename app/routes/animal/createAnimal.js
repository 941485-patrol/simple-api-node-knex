const knex = require('../../../knex/knex');
const Errormsg = require('../../errmsg');
const createAnimalService = require('../../services/animal/createAnimal');
const validateAnimalService = require('../../services/animal/validateAnimal');
const checkAnimalService = require('../../services/animal/searchAnimal');
const getStatusService = require('../../services/status/getStatus');
const getTypeService = require('../../services/type/getType');
const e = require('express');
const createAnimal = async (req, res, next ) => {
  try {
    var animal = await validateAnimalService(req);
    var status = await getStatusService('id', animal.status_id);
    if (status == null) throw new Error('Status ID does not exist.');
    var type = await getTypeService('id', animal.type_id);
    if (type == null) throw new Error('Type ID does not exist.');
    var exists = await checkAnimalService('add', animal.name, animal.description);
    if (exists != null){
      var arr = [];
      console.log(animal.description.toLowerCase())
      if (exists.name.toLowerCase() == animal.name.toLowerCase()) arr.push('Name already exists.');
      if (exists.description.toLowerCase() == animal.description.toLowerCase()) arr.push('Description already exists.');
      var errStr = arr.join(' ');
      throw new Error(errStr);
    } else {
      await createAnimalService(animal.name, animal.description, animal.status_id, animal.type_id);
      res.status(200).json({"message": "Animal created"});
    }
  } catch (error) {
    Errormsg(error, res);
  }
}
module.exports = createAnimal;