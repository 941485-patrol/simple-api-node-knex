const Errmsg = require('../../errmsg');
const deleteTypeService = require('../../services/type/deleteType');
const validateUrl = require('../../services/url/validateUrl');
const deleteType = async (req, res, next)=>{
  try {
    var validUrl = await validateUrl(req.params.id);
    var status = await deleteTypeService(validUrl.url);
    if (status==1) {
      res.status(200).json({'message': 'Type deleted.'});
    } else {
      throw new Error('Type ID does not exist.');
    }
  } catch (error) {
    Errmsg(error, res);
  }
}
module.exports = deleteType;