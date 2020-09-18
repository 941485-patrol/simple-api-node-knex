const StatusForm = require('./statusSchema');
const validateStatus = function(req) {
    return StatusForm.validateAsync({
        name: req.body.name,
        description: req.body.description,
    },options={abortEarly: false});
}
module.exports = validateStatus;