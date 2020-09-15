const AnimalForm = require('./animalSchema');
const validateAnimal = function(req) {
    return AnimalForm.validateAsync({
        name: req.body.name,
        description: req.body.description,
        status_id: req.body.status_id,
        type_id: req.body.type_id
    },options={abortEarly: false});
}
module.exports = validateAnimal;