const animalDescExists = require("./animalDescExists");
const AnimalRepo = require('../../repositories/animal');
const checkAnimalDesc = function(addOrEdit, description, id){
    var animal = new AnimalRepo();
    var searchee = animalDescExists(addOrEdit, description, id);
    return animal.checkAnimalDesc(searchee);
}
module.exports = checkAnimalDesc;