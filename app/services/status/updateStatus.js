const StatusRepo = require('../../repositories/status');
const updateStatus = function(id, name, description){
    var status = new StatusRepo();
    return status.updateStatus(id, name, description);
}
module.exports = updateStatus;