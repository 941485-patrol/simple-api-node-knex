const AnimalRepo = require('../../repositories/animal');
const createAnimal = function(name, description, status_id, type_id){
    var animal = new AnimalRepo();
    return animal.createAnimal(name, description, status_id, type_id);
}
module.exports = createAnimal;