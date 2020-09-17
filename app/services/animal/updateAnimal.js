const AnimalRepo = require('../../repositories/animal');
const updateAnimal = function(id, name, description, status_id, type_id){
    var animal = new AnimalRepo();
    return animal.updateAnimal(id, name, description, status_id, type_id);
}
module.exports = updateAnimal;