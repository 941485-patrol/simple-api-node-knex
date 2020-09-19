const Errormsg = require('../../errmsg');
const validateUrl = require('../../services/url/validateUrl');
const validateTypeService = require('../../services/type/validateType');
const checkTypeName = require('../../services/type/checkTypeName');
const checkTypeEnv = require('../../services/type/checkTypeEnv');
const updateTypeService = require('../../services/type/updateType');
const getOneType = require('../../services/type/getType');
const updateType = async (req, res, next) => {
    try {
        var fieldsArr = [];
        var validUrl = await validateUrl(req.params.id);
        var oldType = await getOneType('id', validUrl.url);
        if (oldType == null) throw new Error('Cannot find type.');
        var newType = await validateTypeService(req);
        var nameExists = await checkTypeName('edit', newType.name, oldType.id);
        if (nameExists != null) fieldsArr.push('Name already exists.');
        var envExists = await checkTypeEnv('edit', newType.environment, oldType.id);
        if (envExists != null) fieldsArr.push('Environment already exists.');
        if (fieldsArr.length != 0) {
            var errStr = fieldsArr.join(' ');
            throw new Error(errStr);
        }
        var updated = await updateTypeService(oldType.id, newType.name, newType.environment);
        if (updated.length == 0) throw new Error('Error updating type.');
        res.redirect(301, req.originalUrl);
    } catch (error) {
        Errormsg(error, res);
    }
}
module.exports = updateType;