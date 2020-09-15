const AnimalRepo = require('../../repositories/animal');
const pushIdtoStatus = function (id, status_id) {
    var animal = new AnimalRepo();
    return animal.pushIdtoStatus(id, status_id);
}
module.exports = pushIdtoStatus