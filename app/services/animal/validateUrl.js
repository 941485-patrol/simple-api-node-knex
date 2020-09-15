const urlSchema = require('./urlSchema');
const validateUrl = function(url) {
    return urlSchema.validateAsync({
        url: url
    });
}
module.exports = validateUrl;