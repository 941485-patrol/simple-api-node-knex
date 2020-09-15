const knex = require('../../../knex/knex');
const Errormsg = require('../../errmsg');
const createAnimalService = require('../../services/animal/createAnimal');
const validateAnimalService = require('../../services/animal/validateAnimal');
const getStatusService = require('../../services/status/getStatus');
const getTypeService = require('../../services/type/getType');
const createAnimal = async (req, res, next ) => {
  try {
    var animal = await validateAnimalService(req);
    var status = await getStatusService('id', animal.status_id);
    if (status == null) throw new Error('Status ID does not exist.');
    var type = await getTypeService('id', animal.type_id);
    if (type == null) throw new Error('Type ID does not exist.');
    await createAnimalService(animal.name, animal.description, animal.status_id, animal.type_id);
    res.status(200).json({"message": "Animal created"});
  } catch (error) {
    Errormsg(error, res);
  }
}
module.exports = createAnimal;