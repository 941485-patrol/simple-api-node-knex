const checkTypeId = async function (value) {
    const Type = require('../models/type');
    var type =  await Type.exists({_id:value});
    if (type === false) return false;
} 
module.exports = checkTypeId;