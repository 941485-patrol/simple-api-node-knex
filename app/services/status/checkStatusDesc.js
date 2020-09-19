const statusDescExists = require('./statusDescExists');
const StatusRepo = require('../../repositories/status');
const checkStatusDesc = function(addorEdit, name, id){
    var status = new StatusRepo();
    var searchee = statusDescExists(addorEdit, name, id);
    return status.checkStatusDesc(searchee);
}
module.exports = checkStatusDesc;