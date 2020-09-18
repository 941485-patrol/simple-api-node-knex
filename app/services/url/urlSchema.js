const Joi = require('joi');
const animalUrlSchema = Joi.object({
    url: Joi.number().integer()
    .required()
    .error(function(errors){
        errors.forEach(err=>{
            if (err.code == 'number.base') err.message = 'Invalid Url';
            if (err.code == 'number.integer') err.message = 'Invalid Url';
        })
        return errors;
    })
})
module.exports = animalUrlSchema;