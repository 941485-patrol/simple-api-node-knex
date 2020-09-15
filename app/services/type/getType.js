const TypeRepo = require('../../repositories/type');
const getType = function(column, value){
    var type = new TypeRepo();
    return type.getType(column, value);
}
module.exports = getType;