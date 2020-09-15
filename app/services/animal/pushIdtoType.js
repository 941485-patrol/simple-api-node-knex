const AnimalRepo = require('../../repositories/animal');
const pushIdtoType = function(id, type_id){
    var animal = new AnimalRepo();
    return animal.pushIdtoType(id, type_id);
}
module.exports = pushIdtoType;