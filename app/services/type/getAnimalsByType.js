const TypeRepo = require('../../repositories/type');
const getAnimalsByType = function(id){
    if (id != null){
        var type = new TypeRepo();
        return type.getAnimalIds(id);
    }
}
module.exports = getAnimalsByType;