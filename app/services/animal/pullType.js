const AnimalRepo = require('../../repositories/animal');
const pullType = function(id) {
    var animal = new AnimalRepo();
    return animal.pullIdsfromTypes(id);
}
module.exports = pullType;