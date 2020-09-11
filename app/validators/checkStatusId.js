const checkStatusId = async function(value) {
    const Status = require("../models/status");
    var status = await Status.exists({_id:value});
    if (status === false) return false;
} 
module.exports = checkStatusId;