const serializeStatus = require('./serializeStatus');
const Errormsg = require('../../errmsg');
const statusPageService = require('../../services/status/pageStatus');
const getAllStatusService = require('../../services/status/getAllStatus');
const getAnimalsByStatus = require('../../services/status/getAnimalsByStatus');
const getOneAnimal = require('../../services/animal/getOneAnimal');
const knex = require('../../../knex/knex');
const getStatuses = async function(req, res, next){
    try {
        var perPage = 5;
        var statuses = await getAllStatusService(req, perPage);
        if (statuses.length == 0) {
            res.status(200).json({message: 'No data.'});
        } else {
            var statusCount = statuses[0].count;
            var totalPages = Math.ceil(parseInt(statusCount)/perPage);
            var statusResults = {};
            var statusArr = [];
            var page = statusPageService(req);
            statuses.forEach(function(status){
                var stat = serializeStatus(status, `${req.originalUrl}/${status.id}`.replace('//','/'));
                statusArr.push(stat);
            });
            statusResults['_this'] = req.originalUrl;
            statusResults['items_this_page'] = statuses.length;
            statusResults['total_items'] = statusCount;
            statusResults['total_pages'] = totalPages;
            statusResults['hasNext'] = page < totalPages ? true : false;
            statusResults['hasPrev'] = page != 1 ? true : false;
            statusResults['results'] = statusArr;
            res.status(200).json(statusResults);
        }
    } catch (error) {
        Errormsg(error, res);
    }
    
};
module.exports = getStatuses;