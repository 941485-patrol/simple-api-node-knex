const TypeRepo = require('../../repositories/type');
const deleteType = function(id){
    var type = new TypeRepo();
    return type.deleteType(id)
}
module.exports = deleteType;