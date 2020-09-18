const statusRepo = require('../../repositories/status');
const createStatus = function(name, description){
    var repo = new statusRepo();
    return repo.createStatus(name, description);
}
module.exports = createStatus;