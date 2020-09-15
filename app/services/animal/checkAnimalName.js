const animalNameExists = require("./animalNameExists");
const AnimalRepo = require('../../repositories/animal');
const checkAnimalName = function(addOrEdit, name, id){
    var animal = new AnimalRepo();
    var searchee = animalNameExists(addOrEdit, name, id);
    return animal.checkAnimalName(searchee);
}
module.exports = checkAnimalName;