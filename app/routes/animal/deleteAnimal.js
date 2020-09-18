const validateUrl = require('../../services/url/validateUrl');
const deleteAnimalService = require('../../services/animal/deleteAnimal');
const pullStatusService = require('../../services/animal/pullStatus');
const pullTypeService = require('../../services/animal/pullType');
const ErrorMsg = require('../../errmsg');
const deleteAnimal = async (req, res, next)=>{
  try {
    var validUrl = await validateUrl(req.params.id);
    var animal = await deleteAnimalService(validUrl.url);
    if (animal == 1) {
      await pullStatusService(validUrl.url);
      await pullTypeService(validUrl.url);
      res.status(200).json({'message': 'Animal deleted.'});
    } else {
      throw new Error('Animal ID does not exist.');
    }
  } catch (error) {
    ErrorMsg(error, res);
  }
}
module.exports = deleteAnimal;