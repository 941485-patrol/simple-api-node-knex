const Status = require('../../models/status');
const serializeStatus = require('./serializeStatus');
const errmsg = require('../../errmsg');
const pageStatuses = require('./pageStatuses');
const sortStatuses = require('./sortStatuses');
const searchStatuses = require('./searchStatuses');

const getStatuses = async function(req, res, next){
    try {
        var page = pageStatuses(req);
        pageSkip = parseInt(page) - parseInt(1);
        var perPage = 5;
        var sort = sortStatuses(req);
        var searchee = searchStatuses(req);
        var statuses = await Status.find(searchee)
            .populate('animal_ids')
            .skip(pageSkip*perPage).limit(perPage)
            .sort(sort);
        var statusCount = await Status.find().estimatedDocumentCount();
        var totalPages = Math.ceil(parseInt(statusCount)/perPage);
        if (statuses.length == 0) {
            var statusRes = {}
            statusRes['results'] = {'message': 'No data.' }; 
            res.status(200).json(statusRes);
        } else {
            var statusRes = {}
            var statusArr = [];
            statuses.forEach((status)=>{
                var statusObj = serializeStatus(status);
                statusArr.push(statusObj);
            });
            statusRes['totalPages'] = totalPages;
            statusRes['_this'] = req.originalUrl;
            statusRes['hasNext'] = page < totalPages ? true : false;
            statusRes['hasPrev'] = page != 1 ? true : false;
            statusRes['results'] = statusArr;
            res.status(200).json(statusRes);
        }
    } catch (error) {
        errmsg(error, res);
    }
    
};
module.exports = getStatuses;