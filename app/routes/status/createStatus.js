const Errmsg = require('../../errmsg');
const createStatusService = require('../../services/status/createStatus');
const validateStatusService = require('../../services/status/validateStatus');
const checkStatusName = require('../../services/status/checkStatusName');
const checkStatusDesc = require('../../services/status/checkStatusDesc');
const createStatus = async function (req, res, next) {
    try {
        var fieldsArr = [];
        var status = await validateStatusService(req);
        var nameExists = await checkStatusName('add', status.name, null);
        if (nameExists != null) fieldsArr.push('Name already exists.');
        var descExists = await checkStatusDesc('add', status.description, null);
        if (descExists != null) fieldsArr.push('Description already exists.');
        if (fieldsArr.length != 0) {
            var errStr = fieldsArr.join(' ');
            throw new Error(errStr);
        }
        var create = await createStatusService(status.name, status.description);
        if (create.length == 0) throw new Error('Error creating status.');
        res.status(200).json({'message': 'Status created.'});
    } catch (error) {
        Errmsg(error, res);
    }
}
module.exports = createStatus;
