const Errormsg = require('../../errmsg');
const validateUrl = require('../../services/url/validateUrl');
const getOneType = require('../../services/type/getType');
const getOneAnimal = require('../../services/type/getAnimalsByType');
const serializeType = require('../../services/type/serializeType');
const serializeAnimal = require('../../services/type/serializeAnimals');
const getType = async (req, res, next)=>{
  try {
    var valildUrl = await validateUrl(req.params.id);
    var type = await getOneType('id', valildUrl.url);
    if (type == null) throw new Error('Cannot find type.');
    var typeObj = serializeType(type, req.originalUrl, one=true);
    var animalArr = [];
    for (id of typeObj.animals) {
      var animal = await getOneAnimal(id);
      animal = serializeAnimal(animal);
      animalArr.push(animal);
    }
    typeObj.animals = animalArr;
    res.status(200).json(typeObj);
  } catch (error) {
    Errormsg(error, res);
  }
}
module.exports = getType;