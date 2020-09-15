const Errormsg = require('../../errmsg');
const animalPageService = require('../../services/animal/pageAnimals');
const getAllAnimalsService = require('../../services/animal/getAllAnimals');
const serializeAnimal = require('./serializeAnimal');
const getAnimals = async (req, res, next)=>
  {
    try {
      var perPage =  5;
      var animals = await getAllAnimalsService(req, perPage);
      if (animals.length == 0) {
        res.status(200).json({message: 'No data.'});
      } else {
        var animalCount = animals[0].count;
        var totalPages = Math.ceil(parseInt(animalCount)/perPage);
        var animalResults = {};
        var animalArr = [];
        var page = animalPageService(req);
        animals.forEach(animal=>{
          var animl = serializeAnimal(animal, `${req.originalUrl}/${animal.id}`);
          animalArr.push(animl);
        })
        animalResults['_this'] = req.originalUrl;
        animalResults['items_this_page'] = animals.length;
        animalResults['total_items'] = animalCount;
        animalResults['hasNext'] = page < totalPages ? true : false;
        animalResults['hasPrev'] = page != 1 ? true : false;
        animalResults['results'] = animalArr;
        res.status(200).json(animalResults);
      }
    } catch (error) {
      Errormsg(error, res);
    }
  }
module.exports = getAnimals;