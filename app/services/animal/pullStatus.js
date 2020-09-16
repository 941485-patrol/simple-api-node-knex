const AnimalRepo = require('../../repositories/animal');
const pullStatus = function(id) {
    var animal = new AnimalRepo();
    return animal.pullIdsfromStatus(id);
}
module.exports = pullStatus;