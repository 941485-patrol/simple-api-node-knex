const Joi = require('joi');
const typeSchema = Joi.object({
    name: Joi.string()
        .required()
        .min(2)
        .max(50)
        .error(function(errors){
            errors.forEach(err => {
                if (err.code == 'string.empty') err.message = 'Name is required';
                if (err.code == 'string.base') err.message = 'Name is required';
                if (err.code == 'string.min') err.message = 'Name is too short';
                if (err.code == 'string.max') err.message = 'Name is too long';
            });
            return errors;
        }),
    environment: Joi.string()
        .required()
        .min(8)
        .max(100)
        .error(function(errors){
            errors.forEach(err => {
                if (err.code == 'string.empty') err.message = 'Environment is required';
                if (err.code == 'string.base') err.message = 'Environment is required';
                if (err.code == 'string.min') err.message = 'Environment is too short';
                if (err.code == 'string.max') err.message = 'Environment is too long';
            });
            return errors;
        }),
});
module.exports = typeSchema;