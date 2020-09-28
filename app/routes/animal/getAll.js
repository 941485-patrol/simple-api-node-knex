const Errormsg = require('../../errmsg');
const getAllService = require('../../services/animal/getAll');
const getAll = async (req, res, next)=>
{
    try {
        var animals = await getAllService();
        var animalResults = {};
        animalResults['_this'] = req.originalUrl;
        animalResults['items_this_page'] = animals.length;
        animalResults['results'] = animals;
        res.status(200).json(animalResults);
    } catch (error) {
        Errormsg(error, res);
    }
}
module.exports = getAll;