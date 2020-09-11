const Type = require('../../models/type');
const Errormsg = require('../../errmsg');
const serializeType = require('./serializeType');
const pageTypes = require('./pageTypes');
const sortTypes = require('./sortTypes');
const searchTypes = require('./searchTypes');

const getTypes = async (req, res, next)=>
{
  try {
    var page = pageTypes(req);
    pageSkip = parseInt(page) - parseInt(1);
    var perPage = 5;
    var sort = sortTypes(req);
    var searchee = searchTypes(req);
    var types = await Type.find(searchee)
      .populate('animal_ids')
      .skip(pageSkip*perPage).limit(perPage)
      .sort(sort);
    var typeCount = await Type.find().estimatedDocumentCount();
    var totalPages = Math.ceil(parseInt(typeCount)/perPage);
    if (types.length == 0) {
      var typeRes = {};
      typeRes['results'] = {'message': 'No data.'};
      res.status(200).json(typeRes);
    } else {
      var typeRes = {};
      var typesArr = [];
      types.forEach(type => {
        var typeObj = serializeType(type);
        typesArr.push(typeObj);
      });
      typeRes['totalPages'] = totalPages;
      typeRes['_this'] = req.originalUrl;
      typeRes['hasNext'] = page < totalPages ? true : false;
      typeRes['hasPrev'] = page != 1 ? true : false;
      typeRes['results'] = typesArr;
      res.status(200).json(typeRes);
    }
  } catch (error) {
    Errormsg(error, res);
  }
}
module.exports = getTypes;