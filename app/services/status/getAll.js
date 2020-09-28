const StatusRepo = require('../../repositories/status');
const getAll = function(){
    var status = new StatusRepo();
    var statuses = status.getAll();
    return statuses;
}
module.exports = getAll;