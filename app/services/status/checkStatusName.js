const statusNameExists = require('./statusNameExists');
const StatusRepo = require('../../repositories/status');
const checkStatusName = function(addorEdit, name, id) {
    var status = new StatusRepo();
    var searchee = statusNameExists(addorEdit, name, id);
    return status.checkStatusName(searchee);
}
module.exports = checkStatusName;