const StatusRepo = require('../../repositories/status');
const getAnimalsByStatus = function(id){
    try {
        if (id != null){
            var status = new StatusRepo();
            return status.getAnimalIds(id);
        }
    } catch (error) {
        console.log(error);
    }
   
  
}
module.exports = getAnimalsByStatus;