const checkAnimal = require("./checkAnimal");
const AnimalRepo = require('../../repositories/animal');
const searchAnimal = function(addOrEdit, name, description){
    var animal = new AnimalRepo();
    var searchee = checkAnimal(addOrEdit, name, description);
    return animal.checkAnimal(searchee);
}
module.exports = searchAnimal;