const Errmsg = require('../../errmsg');
const deleteStatusService = require('../../services/status/deleteStatus');
const validateUrl = require('../../services/url/validateUrl');
const deleteStatus = async function (req, res, next) {
    try {
      var validUrl = await validateUrl(req.params.id);
      var status = await deleteStatusService(validUrl.url);
      if ( status == 1) {
        res.status(200).json({'message': 'Status deleted.'});
      } else {
        throw new Error('Status ID does not exist.');
      }
    } catch (error) {
      Errmsg(error, res);
    }
}
module.exports = deleteStatus;