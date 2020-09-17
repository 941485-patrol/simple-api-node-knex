const searchStatus = require('./searchStatus');
const sortStatus = require('./sortStatus');
const pageStatus = require('./pageStatus');
const StatusRepo = require('../../repositories/status');
const getAllStatus = function(req, perPage) {
    var status = new StatusRepo();
    var searchee = searchStatus(req);
    var page = pageStatus(req);
    var pageSkip = parseInt(page) - parseInt(1);
    var sort = sortStatus(req);
    var statuses = status.getAllStatus(searchee, perPage, pageSkip, sort);
    return statuses;
}
module.exports = getAllStatus;