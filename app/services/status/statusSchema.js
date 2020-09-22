const Joi = require('joi');
const statusSchema = Joi.object({
    name: Joi.string()
        .required()
        .min(2)
        .max(50)
        .error(function(errors){
            errors.forEach(err => {
                if (err.code == 'any.required') err.message = 'Name is required';
                if (err.code == 'string.empty') err.message = 'Name is required';
                if (err.code == 'string.base') err.message = 'Name is required';
                if (err.code == 'string.min') err.message = 'Name is too short';
                if (err.code == 'string.max') err.message = 'Name is too long';
            });
            return errors;
        }),
    description: Joi.string()
        .required()
        .min(8)
        .max(100)
        .error(function(errors){
            errors.forEach(err => {
                if (err.code == 'any.required') err.message = 'Description is required';
                if (err.code == 'string.empty') err.message = 'Description is required';
                if (err.code == 'string.base') err.message = 'Description is required';
                if (err.code == 'string.min') err.message = 'Description is too short';
                if (err.code == 'string.max') err.message = 'Description is too long';
            });
            return errors;
        }),
});
module.exports = statusSchema;