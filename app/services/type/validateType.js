const TypeForm = require('./typeSchema');
const validateType = function(req) {
    return TypeForm.validateAsync({
        name: req.body.name,
        environment: req.body.environment,
    },options={abortEarly: false});
}
module.exports = validateType;