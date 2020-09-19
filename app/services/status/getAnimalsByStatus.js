const StatusRepo = require('../../repositories/status');
const getAnimalsByStatus = function(id){
    if (id != null){
        var status = new StatusRepo();
        return status.getAnimalIds(id);
    }
}
module.exports = getAnimalsByStatus;