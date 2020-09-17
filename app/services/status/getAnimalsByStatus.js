const StatusRepo = require('../../repositories/status');
const getAnimalsByStatus = function(id){
    var status = new StatusRepo();
    return status.getAnimalIds(id);
}
module.exports = getAnimalsByStatus;