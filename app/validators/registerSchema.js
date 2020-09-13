const Joi = require('joi');
const passwordValidate = require('./passwordValidate');
const userNameExists = require('./userNameExists');
const registerSchema = Joi.object({
    username: Joi.string()
        .required()
        .min(8)
        .max(30)
        .external(userNameExists)
        .error(function(errors){
            errors.forEach(err => {
                if (err.code == 'string.empty') err.message = 'Username is required';
                if (err.code == 'string.min') err.message = 'Username must be more than 8 characters';
                if (err.code == 'string.max') err.message = 'Username must not be more than 30 characters';
            });
            return errors;
        }),
    password: Joi.string()
        .min(8)
        .max(50)
        .required()
        .custom(passwordValidate)
        .messages({
            'string.min': 'Password must be more than 8 characters',
            'string.max': 'Password must not be more than 30 characters',
            'any.required': 'Password is required.'
        }),
    repeat_password:Joi.string().valid(Joi.ref('password')).messages({'any.only': 'Passwords must match.'})
});

module.exports = registerSchema;