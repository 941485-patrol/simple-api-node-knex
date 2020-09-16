const AnimalRepo = require('../../repositories/animal');
const deleteAnimal = function(id){
    var animal = new AnimalRepo();
    return animal.deleteAnimal(id);
}
module.exports = deleteAnimal;