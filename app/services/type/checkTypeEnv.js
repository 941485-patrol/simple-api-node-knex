const typeEnvExists = require('./typeEnvExists');
const TypeRepo = require('../../repositories/type');
const checkTypeEnv = function(addorEdit, name, id){
    var type = new TypeRepo();
    var searchee = typeEnvExists(addorEdit, name, id);
    return type.checkTypeEnv(searchee);
}
module.exports = checkTypeEnv