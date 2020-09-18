const StatusRepo = require('../../repositories/status');
const deleteStatus = function(id){
    var status = new StatusRepo();
    return status.deleteStatus(id)
}
module.exports = deleteStatus;