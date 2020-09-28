const TypeRepo = require('../../repositories/type');
const getAll = function(){
    var type = new TypeRepo();
    var types = type.getAll();
    return types;
}
module.exports = getAll;