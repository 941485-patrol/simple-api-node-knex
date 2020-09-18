const Errmsg = require('../../errmsg');
const validateUrl = require('../../services/url/validateUrl');
const validateStatusService = require('../../services/status/validateStatus');
const checkStatusName = require('../../services/status/checkStatusName');
const checkStatusDesc = require('../../services/status/checkStatusDesc');
const updateStatusService = require('../../services/status/updateStatus');
const getOneStatus = require('../../services/status/getStatus');
const updateStatus = async function (req, res, next) {
    try {
        var fieldsArr = [];
        var validUrl = await validateUrl(req.params.id);
        var oldStatus = await getOneStatus('id', validUrl.url);
        if (oldStatus == null) throw new Error('Cannot find status.');
        var newStatus = await validateStatusService(req);
        var nameExists = await checkStatusName('edit', newStatus.name, oldStatus.id);
        if (nameExists != null) fieldsArr.push('Name already exists.');
        var descExists = await checkStatusDesc('edit', newStatus.description, oldStatus.id);
        if (descExists != null) fieldsArr.push('Description already exists.');
        if (fieldsArr.length != 0) {
            var errStr = fieldsArr.join(' ');
            throw new Error(errStr);
        }
        var updated = await updateStatusService(oldStatus.id, newStatus.name, newStatus.description);
        if (updated.length == 0) throw new Error('Error updating status.');
        res.redirect(301, req.originalUrl);
    } catch (error) {
        Errmsg(error, res);
    }
}
module.exports = updateStatus;