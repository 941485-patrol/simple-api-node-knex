const Errmsg = require('../../errmsg');
const validateUrl = require('../../services/url/validateUrl');
const getOneStatus = require('../../services/status/getStatus');
const getOneAnimal = require('../../services/status/getAnimalsByStatus');
const serializeStatus = require('../../services/status/serializeStatus');
const serializeAnimal = require('../../services/status/serializeAnimals');
const getStatus = async function (req, res, next) {
    try {
        var validUrl = await validateUrl(req.params.id);
        var status = await getOneStatus('id', validUrl.url);
        if (status == null) throw new Error('Cannot find status.');
        var statusObj = serializeStatus(status, req.originalUrl, one=true);
        var animalArr = [];
        for (id of statusObj.animals) {
            var animal = await getOneAnimal(id);
            animal = serializeAnimal(animal);
            animalArr.push(animal);
        }
        statusObj.animals = animalArr;
        res.status(200).json(statusObj);
    } catch (error) {
        Errmsg(error, res);
    }
}
module.exports = getStatus;