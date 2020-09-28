const AnimalRepo = require('../../repositories/animal');
const getAllAnimals = function(){
    var animal = new AnimalRepo();
    var animals = animal.getAll();
    return animals;
}
module.exports = getAllAnimals;