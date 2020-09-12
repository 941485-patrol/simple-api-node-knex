const Joi = require('joi');
const passwordValidate = require('./passwordValidate');

const registerSchema = Joi.object({
    username: Joi.string()
        .required()
        .min(3)
        .max(30),
    password: Joi.string()
        .min(8)
        .required()
        .custom(passwordValidate),
    repeat_password:Joi.string().valid(Joi.ref('password')).messages({'any.only': 'Passwords must match.'})
});

module.exports = registerSchema;