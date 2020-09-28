const Errormsg = require('../../errmsg');
const getAllService = require('../../services/status/getAll');
const getAll = async (req, res, next)=>
{
    try {
        var statuses = await getAllService();
        var statusResults = {};
        statusResults['_this'] = req.originalUrl;
        statusResults['items_this_page'] = statuses.length;
        statusResults['results'] = statuses;
        res.status(200).json(statusResults);
    } catch (error) {
        Errormsg(error, res);
    }
}
module.exports = getAll;