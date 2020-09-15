const Joi = require('joi');
const animalSchema = Joi.object({
    name: Joi.string()
        .required()
        .min(1)
        .max(50)
        .error(function(errors){
            errors.forEach(err => {
                if (err.code == 'string.empty') err.message = 'Name is required';
                if (err.code == 'string.min') err.message = 'Name must be more than 8 characters';
                if (err.code == 'string.max') err.message = 'Username must not be more than 30 characters';
            });
            return errors;
        }),
    description: Joi.string()
        .required()
        .min(8)
        .max(100),
    status_id: Joi.number().allow(null),
    type_id: Joi.number().allow(null)
});
module.exports = animalSchema;