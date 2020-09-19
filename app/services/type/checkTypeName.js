const typeNameExists = require('./typeNameExists');
const TypeRepo = require('../../repositories/type');
const checkTypeName = function(addorEdit, name, id) {
    var type = new TypeRepo();
    var searchee = typeNameExists(addorEdit, name, id);
    return type.checkTypeName(searchee);
}
module.exports = checkTypeName;