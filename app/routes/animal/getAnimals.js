const Errormsg = require('../../errmsg');
const getAllAnimalsService = require('../../services/animal/getAllAnimals');
const getAnimals = async (req, res, next)=>
  {
    try {
      var animals = await getAllAnimalsService(req);
      if (animals.length == 0) {
        res.status(200).json({message: 'No data.'});
      } else {
        var animalResults = {}
        animalResults['_this'] = req.originalUrl;
        animalResults['results'] = animals;
        res.status(200).json(animalResults);
      }
    } catch (error) {
      Errormsg(error, res);
    }
  }
module.exports = getAnimals;