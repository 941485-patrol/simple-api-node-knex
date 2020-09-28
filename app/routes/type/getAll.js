const Errormsg = require('../../errmsg');
const getAllService = require('../../services/type/getAll');
const getAll = async (req, res, next)=>
{
    try {
        var types = await getAllService();
        var typeResults = {};
        typeResults['_this'] = req.originalUrl;
        typeResults['items_this_page'] = types.length;
        typeResults['results'] = types;
        res.status(200).json(typeResults);
    } catch (error) {
        Errormsg(error, res);
    }
}
module.exports = getAll;