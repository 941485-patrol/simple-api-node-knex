const AnimalRepo = require('../../repositories/animal');
const getOneAnimal = function(id){
    var animal = new AnimalRepo();
    return animal.getAnimal(id);
}
module.exports = getOneAnimal;