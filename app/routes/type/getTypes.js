const Errormsg = require('../../errmsg');
const typePageService = require('../../services/type/pageType');
const getAllTypeService = require('../../services/type/getAllTypes');
const getAnimalsByType = require('../../services/type/getAnimalsByType');
const serializeType = require('../../services/type/serializeType');
const serializeAnimals = require('../../services/type/serializeAnimals');
const getTypes = async (req, res, next)=>
{
  try {
    var perPage = 5;
    var types = await getAllTypeService(req, perPage);
    if (types.length == 0) {
      res.status(200).json({message: 'No data.'});
    } else {
      var typeCount = types[0].count;
      var totalPages = Math.ceil(parseInt(typeCount)/perPage);
      var typeResults = {};
      var typeArr = [];
      var page = typePageService(req);
      types.forEach(function(type){
        var typ = serializeType(type, req.originalUrl, one=false);
        typeArr.push(typ);
      });
      for (var types of typeArr) {
        var animalArr = [];
        for (var id of types.animals) {
          var animal = await getAnimalsByType(id);
          animal = serializeAnimals(animal);
          animalArr.push(animal);
        }
        types.animals = animalArr;
      }
      typeResults['_this'] = req.originalUrl;
      typeResults['items_this_page'] = types.length;
      typeResults['total_items'] = typeCount;
      typeResults['total_pages'] = totalPages;
      typeResults['current_page'] = page;
      typeResults['hasNext'] = page < totalPages ? true : false;
      typeResults['hasPrev'] = page != 1 ? true : false;
      typeResults['results'] = typeArr;
      res.status(200).json(typeResults);
    }
  } catch (error) {
    Errormsg(error, res);
  }
}
module.exports = getTypes;