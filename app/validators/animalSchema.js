const Joi = require('joi');
const animalSchema = Joi.object({
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
    description: Joi.string()
        .required()
        .min(8)
        .max(100)
        .error(function(errors){
            errors.forEach(err => {
                if (err.code == 'string.empty') err.message = 'Description is required';
                if (err.code == 'string.base') err.message = 'Description is required';
                if (err.code == 'string.min') err.message = 'Description is too short';
                if (err.code == 'string.max') err.message = 'Description is too long';
            });
            return errors;
        }),
    status_id: Joi.number()
        .required()
        .error(function(errors){
            errors.forEach(err=>{
                if (err.code == 'number.base') err.message = 'Invalid Status ID';
                if (err.code == 'number.integer') err.message = 'Invalid Status ID';
            });
            return errors;
        }),
    type_id: Joi.number().integer()
        .required()
        .error(function(errors){
            errors.forEach(err=>{
                if (err.code == 'number.base') err.message = 'Invalid Type ID';
                if (err.code == 'number.integer') err.message = 'Invalid Type ID';
            })
            return errors;
        })
});
module.exports = animalSchema;