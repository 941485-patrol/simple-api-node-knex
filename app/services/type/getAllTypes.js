const searchType = require('./searchType');
const sortType = require('./sortType');
const pageType = require('./pageType');
const TypeRepo = require('../../repositories/type');
const getAllTypes = function(req, perPage) {
    var type = new TypeRepo();
    var searchee = searchType(req);
    var page = pageType(req);
    var pageSkip = parseInt(page) - parseInt(1);
    var sort = sortType(req);
    var types = type.getAllTypes(searchee, perPage, pageSkip, sort);
    return types;
}
module.exports = getAllTypes;