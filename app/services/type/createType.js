const TypeRepo = require('../../repositories/type');
const createType = function(name, environment){
    var type = new TypeRepo();
    return type.createType(name, environment);
}
module.exports = createType;