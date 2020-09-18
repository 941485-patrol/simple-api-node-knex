const knex = require('../../../knex/knex.js');
const Errormsg = require('../../errmsg.js');
const getOneAnimal = require('../../services/animal/getOneAnimal.js');
const validateUrl = require('../../services/animal/validateUrl.js');
const serializeAnimal = require('../../services/animal/serializeAnimal');
const getAnimal = async (req, res, next)=>{
  try {
    var validUrl = await validateUrl(req.params.id);
    var animal = await getOneAnimal(validUrl.url);
    if (animal == null) throw new Error('Cannot find animal.');
    var animalObj = serializeAnimal(animal, req.originalUrl, one=true);
    res.status(200).json(animalObj);
  } catch (error) {
    Errormsg(error, res);
  }
}
module.exports = getAnimal;