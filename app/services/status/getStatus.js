const StatusRepo = require('../../repositories/status');
const getStatus = function(column, value){
    var status = new StatusRepo();
    return status.getStatus(column, value);
}
module.exports = getStatus;