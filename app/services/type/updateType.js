const TypeRepo = require('../../repositories/type');
const updateType = function(id, name, environment){
    var type = new TypeRepo();
    return type.updateType(id, name, environment);
}
module.exports = updateType;